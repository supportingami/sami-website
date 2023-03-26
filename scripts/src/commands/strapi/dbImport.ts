import { Command } from "commander";
import { existsSync, writeFileSync } from "fs";
import { readdirSync, ensureDirSync, readJSONSync } from "fs-extra";
import path from "path";
import prompts from "prompts";
import { PATHS } from "../../paths";
import { arrayToHashmap, getLoadedEnv } from "../../utils";
import { getDB, listDBTables, mapDBData } from "./common";

/***************************************************************************************
 * CLI
 * @example yarn
 *************************************************************************************/
interface IProgramOptions {
  table?: string;
}
const program = new Command("db:import");
export default program
  .description("Import strapi data")
  .option("-t --table <string>", "Single table to import (omit to include all)")
  .action(async (options: IProgramOptions) => {
    new DBImport().run(options).then(() => process.exit(0));
  });

/***************************************************************************************
 * Main Methods
 *************************************************************************************/

interface ImportSummary {
  table: string;
  filePath: string;
  summary?: any;
  existingData: any[];
  importData: any[];
}
class DBImport {
  private db: Awaited<ReturnType<typeof getDB>>;
  private get client(): "postgres" | "sqlite" {
    return this.db.client.config.client;
  }

  /**
   *
   **/
  public async run(options: IProgramOptions) {
    // setup folders
    const importDir = path.resolve(PATHS.dataDir, "db");
    ensureDirSync(importDir);

    // query list of local and remote data tables
    this.db = await getDB();
    const dbTables = await listDBTables(this.db);
    const localDataTables = this.listLocalDataTables(importDir, options);

    // get summary of local and import data
    const data: ImportSummary[] = [];
    for (const { filePath, table } of localDataTables) {
      const importData = readJSONSync(filePath);
      let existingData = [];
      if (dbTables.includes(table)) {
        existingData = await this.getTableData(table);
      }
      const summary = this.generateSummary(table, importData, existingData);
      data.push({ importData, existingData, filePath, table, summary });
    }

    // process import
    const confirmed = await this.confirmImport(data);
    if (confirmed) {
      this.backupData(data);
      await this.handleImport(data);
    }
  }

  /** Retrieve a list of data tables represented in local json data files */
  private listLocalDataTables(importDir: string, options: IProgramOptions) {
    let localDataTables = readdirSync(importDir)
      .map((name) => ({
        filePath: path.resolve(importDir, name),
        table: name.replace(".json", ""),
      }))
      .sort(this.sortImports);
    // filter if single table option provided
    if (options.table) {
      localDataTables = localDataTables.filter(({ table }) => options.table === table);
    }
    return localDataTables;
  }

  /** Write a copy of db data to json file for use in recovery in case of accidental overwrite */
  private backupData(data: ImportSummary[]) {
    const backup: Record<string, any[]> = {};
    for (const { table, existingData } of data) {
      backup[table] = existingData;
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
    const summaries = data.map(({ summary }) => summary).filter((v) => v);
    if (summaries.length === 0) {
      console.log("Up to date");
      return false;
    }
    console.table(summaries);
    const { confirmed } = await prompts({ type: "confirm", name: "confirmed", message: "Continue?" });
    return confirmed;
  }

  private async handleImport(data: ImportSummary[]) {
    let sequenceData: ImportSummary;
    for (const { table, summary, importData } of data) {
      if (summary) {
        // track sequence data to upload after other inserts
        if (table === "sqlite_sequence") {
          sequenceData = { table, summary, importData } as any;
        } else {
          console.log(table);
          const rows = this.normaliseImportData(table, importData);
          await this.truncateTable(table);
          if (rows.length > 0) {
            await this.insertRows(table, rows);
          }
        }
      }
    }
    if (sequenceData && this.client === "sqlite") {
      await this.updateSqliteSequence(sequenceData.importData);
    }
  }

  /**
   * Compare local and import data, generating a summary of operations to perform
   * NOTE - tables will be fully deleted and recreated, so output only a rough
   * indication of what the expected outcome will be
   * */
  private generateSummary(table: string, importData: any[], localData: any[]) {
    const ops = { table, INSERT: 0, REPLACE: 0, DELETE: 0, SKIP: 0 };

    const primaryKey = this.getTablePrimaryKey(table);
    const importHashmap = arrayToHashmap(importData, primaryKey);
    const localHashmap = arrayToHashmap(localData, primaryKey);

    for (const [index, importEntry] of Object.entries(importHashmap)) {
      const localEntry = localHashmap[index];
      // new rows
      if (!localEntry) {
        ops.INSERT++;
      }
      // existing rows (conflict or same)
      else {
        const isSame = this.compareEntries(localEntry, importEntry);
        if (isSame) {
          ops.SKIP++;
        } else {
          ops.REPLACE++;
        }
      }
    }
    for (const [index] of localData.entries()) {
      const importEntry = importData[index];
      if (!importEntry) {
        ops.DELETE++;
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

  private compareEntries(a: any, b: any) {
    if (Object.keys(a).length !== Object.keys(b).length) return false;
    return Object.keys(a).every((key) => a[key] === b[key]);
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
  private normaliseImportData(table: string, rows: any[]) {
    if (this.client === "postgres" && rows.length > 0) {
      // ignore sqlite_sequence data
      if (table === "sqlite_sequence") {
        return [];
      }
      rows = this.normalisePostgresImport(rows);
    }
    return rows;
  }

  /** Convert postgres data to sqlite-compatible formats */
  private normalisePostgresImport(rows: any[]) {
    const mappings = {
      // sqlite stores epoch milliseconds, postgres date string
      created_at: (v: string) => new Date(v),
      updated_at: (v: string) => new Date(v),
      published_at: (v: string) => new Date(v),
    };
    return mapDBData(rows, mappings);
  }
}
