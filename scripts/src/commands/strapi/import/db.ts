import { existsSync, writeFileSync } from "fs";
import { readdirSync, ensureDirSync, readJSONSync } from "fs-extra";
import path, { resolve } from "path";
import prompts from "prompts";
import { PATHS } from "../../../paths";
import { areDBObjectsEqual, arrayToHashmap, getLoadedEnv, logError } from "../../../utils";
import { getDB, listDBTables, mapDBData } from "../common";
import chalk from "chalk";

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

interface ImportSummary {
  table: string;
  filePath: string;
  summary?: any;
  remoteData: any[];
  localData: any[];
}
export class DBImport {
  private db: Awaited<ReturnType<typeof getDB>>;
  private get remoteClient(): "postgres" | "sqlite" {
    return this.db.client.config.client;
  }

  /**
   *
   **/
  public async run(envName: string, table?: string) {
    // setup folders
    const importDir = path.resolve(PATHS.dataDir, "db-json");
    ensureDirSync(importDir);

    // query list of local and remote data tables
    this.db = await getDB(envName);
    const dbTables = await listDBTables(this.db);
    const exportDataTables = this.listLocalDataTables(importDir, table);

    // get summary of local and import data
    const data: ImportSummary[] = [];
    for (const { filePath, table } of exportDataTables) {
      const localDataRaw = readJSONSync(filePath);
      const localData = this.normaliseLocalData(table, localDataRaw);
      let remoteData = [];
      if (dbTables.includes(table)) {
        const remoteDataRaw = await this.getTableData(table);
        remoteData = this.normaliseRemoteData(table, remoteDataRaw);
      }
      const summary = this.generateSummary({ table, localData, remoteData });
      data.push({ localData, remoteData, filePath, table, summary });
    }

    // process import
    const confirmed = await this.confirmImport(data);
    if (confirmed) {
      this.backupData(data);
      await this.handleImport(data);
    }
  }

  /** Retrieve a list of data tables represented in local json data files */
  private listLocalDataTables(importDir: string, table?: string) {
    let localDataTables = readdirSync(importDir)
      .map((name) => ({
        filePath: path.resolve(importDir, name),
        table: name.replace(".json", ""),
      }))
      .sort(this.sortImports);
    // filter if single table option provided
    if (table) {
      localDataTables = localDataTables.filter(({ table }) => table === table);
    }
    return localDataTables;
  }

  /** Write a copy of db data to json file for use in recovery in case of accidental overwrite */
  private backupData(data: ImportSummary[]) {
    const backup: Record<string, any[]> = {};
    for (const { table, remoteData } of data) {
      backup[table] = remoteData;
    }
    const backupFilepath = this.getBackupFilepath();
    writeFileSync(backupFilepath, JSON.stringify(backup, null, 2));
  }
  /** Generate a name for the backup, using environment name and timestamp (with suffix in case of duplicates) */
  private getBackupFilepath(suffix = 0) {
    const backupDir = path.resolve(PATHS.dataDir, "backups");
    ensureDirSync(backupDir);
    const { name } = getLoadedEnv();
    const d = new Date();
    let baseName = `${name}-${d.toISOString().substring(0, 10)}`;
    if (suffix) {
      baseName += `-${suffix}`;
    }
    const backupPath = path.resolve(backupDir, `${baseName}.json`);
    if (existsSync(backupPath)) {
      return this.getBackupFilepath(suffix + 1);
    }
    return backupPath;
  }

  /** Process imports so that sqlite sequenc and linked tables last */
  private sortImports(a: { table: string }, b: { table: string }) {
    if (a.table === "sqlite_sequence") return 1;
    if (b.table === "sqlite_sequence") return -1;
    if (a.table === "files_related_morphs") return 1;
    if (b.table === "files_related_morphs") return -1;
    if (a.table.endsWith("links")) return 1;
    if (b.table.endsWith("links")) return -1;
    return a.table > b.table ? 1 : -1;
  }

  private async confirmImport(data: ImportSummary[]) {
    if (process.env.CI) return true;
    const summaries = data.map(({ summary }) => summary).filter((v) => v);
    if (summaries.length === 0) {
      console.log(chalk.green("DB - Up to date"));
      return false;
    }
    console.table(summaries);
    const { confirmed } = await prompts({ type: "confirm", name: "confirmed", message: "Continue?" });
    return confirmed;
  }

  /**
   * @param data Data to import
   */
  private async handleImport(data: ImportSummary[]) {
    let sequenceData: ImportSummary;
    const errors: { table: string; msg: string }[] = [];
    for (const { table, summary, localData } of data) {
      if (summary) {
        // track sequence data to upload after other inserts
        if (table === "sqlite_sequence") {
          sequenceData = { table, summary, localData } as any;
        } else {
          // delete existing data (should exist from bootstrap process)
          await this.truncateTable(table);
          if (localData.length > 0) {
            try {
              await this.insertRows(table, localData);
            } catch (error) {
              errors.push({ table, msg: error.message });
            }
          }
        }
      }
    }
    if (sequenceData && this.remoteClient === "sqlite") {
      await this.updateSqliteSequence(sequenceData.localData);
    }
    // Log all import errors
    if (errors.length > 0) {
      const logPath = resolve(PATHS.logsDir, "db-import.error.log");
      writeFileSync(logPath, JSON.stringify(errors, null, 2));
      const failedTables = errors.map((t) => t.table).join(", ");
      console.log("\n", chalk.gray(logPath));
      logError({ msg1: "Import complete with errors", msg2: failedTables });
    }
  }

  /**
   * Compare local and import data, generating a summary of operations to perform
   * NOTE - tables will be fully deleted and recreated, so output only a rough
   * indication of what the expected outcome will be
   * */
  private generateSummary(options: { table: string; remoteData: any[]; localData: any[] }) {
    const { table, remoteData, localData } = options;
    const ops = { table, INSERT: 0, REPLACE: 0, DELETE: 0, SKIP: 0 };
    const primaryKey = this.getTablePrimaryKey(table);
    const remoteHashmap = arrayToHashmap(remoteData || [], primaryKey);
    const localHashmap = arrayToHashmap(localData || [], primaryKey);

    for (const [index, remoteEntry] of Object.entries(remoteHashmap)) {
      const localEntry = localHashmap[index];
      // DELETE remote entries that do not appear locally
      if (!localEntry) {
        ops.DELETE++;
      } else {
        const isSame = areDBObjectsEqual(localEntry, remoteEntry);
        if (isSame) {
          ops.SKIP++;
        } else {
          // REPLACE remote entries where local differs
          ops.REPLACE++;
        }
      }
    }
    for (const [index] of localData.entries()) {
      const remoteEntry = remoteData[index];
      // INSERT remote entry does not exist
      if (!remoteEntry) {
        ops.INSERT++;
      }
    }
    let totalOps = ops.INSERT + ops.DELETE + ops.REPLACE;
    // ignore sequence delete of untracked tables
    if (table === "sqlite_sequence") {
      totalOps = ops.INSERT + ops.REPLACE;
    }
    if (totalOps > 0) {
      return ops;
    }
  }

  private getTablePrimaryKey(table: string) {
    const customKeys = {
      sqlite_sequence: "name",
      files_related_morphs: "file_id",
      files_folder_links: "file_id",
    };
    return customKeys[table] ?? "id";
  }

  /**
   *
   * @param table
   * https://stackoverflow.com/questions/4280041/truncate-a-sqlite-table-if-it-exists
   */
  private async truncateTable(table: string) {
    return this.db.raw(`DELETE FROM ${table}`);
  }

  private async insertRows(table: string, rows: any[]) {
    return this.db.batchInsert(table, rows);
  }

  /** Update local sqlite sequence to match latest seq ids applied to data tables */
  private async updateSqliteSequence(values: { name: string; seq: number }[]) {
    const table = "sqlite_sequence";
    for (const { name, seq } of values) {
      const sql = `UPDATE ${table} SET 'seq' = ${seq} WHERE name = '${name}'`;
      await this.db.raw(sql);
    }
  }

  private getTableData(table: string) {
    return this.db(table).select("*");
  }

  /** Handle discrepencies between datatypes in postgres and sqlite dbs */
  private normaliseLocalData(table: string, rows: any[] = []) {
    if (this.remoteClient === "postgres" && rows.length > 0) {
      // ignore sqlite_sequence data
      if (table === "sqlite_sequence") {
        return [];
      }
      rows = this.convertToPostgres(rows);
    }
    return rows;
  }

  private normaliseRemoteData(table: string, rows: any[] = []) {
    if (this.remoteClient === "postgres" && rows.length > 0) {
      if (table === "files") {
        const mappings = {
          // HACK sometimes postgres query return string instead of numeric size
          size: (v: any) => {
            if (typeof v === "string") return Number(v);
            return v;
          },
        };
        return mapDBData(rows, mappings);
      }
    }
    return rows;
  }

  /** Convert postgres data to sqlite-compatible formats */
  private convertToPostgres(rows: any[]) {
    const mappings = {
      // sqlite stores epoch milliseconds, postgres date string
      created_at: (v: string) => new Date(v),
      updated_at: (v: string) => new Date(v),
      published_at: (v: string) => new Date(v),
      formats: (v: string) => {
        if (v && typeof v === "string") return JSON.parse(v);
        return v;
      },
      // 2022-06-04 -> date object
      date_written: (v: any) => {
        if (typeof v === "string") {
          return new Date(`${v}T00:00:00`);
        }
        return v;
      },
      size: (v: string) => {
        if (typeof v === "string") {
          return Number(v);
        }
        if (v === undefined) {
          return null;
        }
        return v;
      },
    };
    return mapDBData(rows, mappings);
  }
}
