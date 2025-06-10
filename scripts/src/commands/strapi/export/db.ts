import { spawnSync } from "child_process";

import { emptyDirSync, ensureDirSync, existsSync, rmSync, writeFileSync } from "fs-extra";
import path, { resolve } from "path";
import { PATHS } from "../../../paths";
import { sortJSONObjectByKey } from "../../../utils/object.utils";
import { getDB, listDBTables, mapDBData } from "../common";
import { replicateDir } from "../../../utils/file.utils";
import { tmpdir } from "os";
import chalk from "chalk";

/***************************************************************************************
 * Main Methods
 *************************************************************************************/
export class DBExport {
  private db: Awaited<ReturnType<typeof getDB>>;
  private get client(): "postgres" | "sqlite" {
    return this.db.client.config.client;
  }

  public async run(envName: string, envParsed: any) {
    const gcsBucket = envParsed.GCS_DB_BUCKET_NAME;
    if (gcsBucket) {
      const dbDir = resolve(PATHS.dataDir, "db");
      const cmd = `gcloud storage rsync gs://${gcsBucket} ${dbDir}`;
      console.log(chalk.gray(cmd));
      spawnSync(cmd, {
        shell: true,
        stdio: "inherit",
        cwd: PATHS.rootDir,
      });
      const dbFilename = envParsed.DATABASE_FILENAME;
      const targetDB = resolve(dbDir, dbFilename);
      if (!existsSync(targetDB)) {
        console.log(`Create new db for export:`, `${dbDir}/${dbFilename}`);
        writeFileSync(`${dbDir}/${dbFilename}`, "");
        // throw new Error("DB not exported:\n" + `${dbDir}/${dbFilename}`);
      }
    }
    // query list of all tables
    this.db = await getDB(envName);
    const allTables = await listDBTables(this.db);

    // filter only to include content-generated tables
    const exportedTables = allTables.filter((name) => shouldIncludeTableInExport(name)).sort();

    // setup folders - will first export to tmp location and then replicate to output
    const stagingDir = resolve(tmpdir(), "dbExport");
    const outputDir = path.resolve(PATHS.dataDir, "db-json");
    ensureDirSync(stagingDir);
    ensureDirSync(outputDir);
    emptyDirSync(stagingDir);

    // export
    for (const name of exportedTables) {
      await this.exportTableData(name, stagingDir);
    }
    // destroy knex connection to also clear WAL files
    await this.db.destroy();
    // run prettier on exports to match formatting on output
    spawnSync(`prettier ${stagingDir} --loglevel silent --write`, {
      shell: true,
      stdio: "inherit",
      cwd: PATHS.rootDir,
    });

    replicateDir(stagingDir, outputDir);
    rmSync(stagingDir, { recursive: true });
  }

  private async exportTableData(name: string, outputDir: string) {
    const rows = await this.db(name).select("*");
    const exportData = this.prepareDataForExport(name, rows);
    const outputPath = path.resolve(outputDir, `${name}.json`);
    writeFileSync(outputPath, exportData);
  }

  private prepareDataForExport(name: string, data: any[]) {
    // keep sqlite auto-index for exported tables (but ignore for rest)
    // NOTE - we could try reset all sequences to 0, but would break linked tables/files
    if (name === "sqlite_sequence") {
      data = data.filter((entry) => shouldIncludeTableInExport(entry.name));
    }
    // normalise
    const normalised = this.normaliseExportData(name, data);

    // sort all json in alphabetical order
    const sorted = normalised.map((v) => sortJSONObjectByKey(v));

    // otherwise just convert to formatted string
    return JSON.stringify(sorted, null, 2);
  }

  /** Handle discrepencies between datatypes in postgres and sqlite dbs */
  private normaliseExportData(table: string, rows: any[]) {
    if (this.client === "postgres" && rows.length > 0) {
      // sqlite stores epoch milliseconds, convert postgres datestrings
      rows = this.normalisePostgresExport(table, rows);
    }
    if (rows.length > 0) {
      rows = this.sortRows(table, rows);
    }
    return rows;
  }

  /**
   * Sort export data by preferred key (most use id, file_id or seq)
   * Optionally include secondary and tertiary keys for finer sorting
   */
  private sortRows(table: string, rows: any[]) {
    const columns = Object.keys(rows[0]);
    const [primaryKey, secondaryKey, tertiaryKey] = getSortKeys();
    return rows.sort((a, b) => {
      if (a[primaryKey] === b[primaryKey] && secondaryKey) {
        if (a[secondaryKey] === b[secondaryKey] && tertiaryKey) {
          return a[tertiaryKey] > b[tertiaryKey] ? 1 : -1;
        }
        return a[secondaryKey] > b[secondaryKey] ? 1 : -1;
      }
      return a[primaryKey] > b[primaryKey] ? 1 : -1;
    });

    function getSortKeys() {
      if (table === "sqlite_sequence") return ["name"];
      if (table === "files_related_morphs") return ["file_id", "related_type", "related_id"];
      if (columns.includes("id")) return ["id"];
      if (columns.includes("file_id")) return ["file_id"];
      return columns[0];
    }
  }

  /** Convert postgres data to sqlite-compatible formats */
  private normalisePostgresExport(table: string, rows: any[]) {
    const mappings = {
      // sqlite stores short form 2020-10-01, postgres full
      date_written: (v: string) => new Date(v).toISOString().slice(0, 10),
      // sqlite stores epoch milliseconds, postgres date string
      created_at: (v: string) => new Date(v).getTime(),
      updated_at: (v: string) => new Date(v).getTime(),
      published_at: (v: string) => new Date(v).getTime(),
      // sqlite stores number, postgres string
      size: (v: string) => Number(v),
    };
    return mapDBData(rows, mappings);
  }
}

/** Filter tables to only export content-generated tables */
function shouldIncludeTableInExport(name: string) {
  if (name.startsWith("admin_")) return false;
  if (name.startsWith("i18n_")) return false;
  if (name.startsWith("strapi_")) return false;
  if (name.startsWith("up_")) return false;
  return true;
}
