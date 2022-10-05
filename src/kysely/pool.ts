import { ptr } from "bun:ffi";
import {
  PostgresCursor,
  PostgresPool,
  PostgresPoolClient,
  PostgresQueryResult,
} from "kysely";
import { libpq, libpqConstants } from "../lib";

const utf8e = new TextEncoder();
const nil = ptr(utf8e.encode("\0"));

class BunPostgresPoolClient implements PostgresPoolClient {
  #conn: number;
  constructor(conn: number) {
    this.#conn = conn;
  }

  query<R>(
    sql: string,
    parameters: readonly unknown[]
  ): Promise<PostgresQueryResult<R>>;
  query<R>(cursor: PostgresCursor<R>): PostgresCursor<R>;
  query<R>(
    sql: unknown,
    parameters?: unknown
  ): Promise<PostgresQueryResult<R>> | PostgresCursor<R> {
    if (Array.isArray(parameters) && typeof sql === "string") {
      return new Promise((resolve, reject) => {
        const paramValues = new Uint8Array(
          parameters.map((p) => {
            if (p === null) {
              return nil;
            }
            const buf = utf8e.encode(p);
            return ptr(buf);
          })
        );
        const paramLengths = new Uint8Array(
          parameters.map((p) => {
            if (p === null) {
              return 0;
            }
            return utf8e.encode(p).byteLength;
          })
        );
        const paramFormats = new Uint8Array(
          parameters.map((p) => {
            if (p === null) {
              return 0;
            }
            return 0;
          })
        );
        // console.log("burp");

        const res = libpq.PQexecParams(
          this.#conn,
          utf8e.encode(sql),
          parameters.length,
          nil,
          paramValues,
          paramLengths,
          paramFormats,
          0
        );
        if (res === 0) {
          reject(new Error("PQexecParams failed"));
          return;
        }
        const status = libpq.PQresultStatus(res);
        if (status !== libpqConstants.PGRES_TUPLES_OK) {
          const err = libpq.PQresultErrorMessage(res);
          reject(new Error(err));
          return;
        }
        const rows = [];
        const rowCount = libpq.PQntuples(res);
        const colCount = libpq.PQnfields(res);
        const colNames = [];
        for (let i = 0; i < colCount; i++) {
          colNames.push(libpq.PQfname(res, i));
        }
        for (let i = 0; i < rowCount; i++) {
          const row = {};
          for (let j = 0; j < colCount; j++) {
            const value = libpq.PQgetvalue(res, i, j);
            row[colNames[j]] = value;
          }
          rows.push(row);
        }

        resolve({
          command: "SELECT",
          rowCount,
          rows,
        });
        // const stmt = libpq.PQprepare(
        //   this.#conn,
        //   "",
        //   utf8e.encode(sql),
        //   parameters.length,
        //   null
        // );
        // console.log({ stmt });
        // if (stmt === 0) {
        //   reject(libpq.PQerrorMessage(this.#conn));
        // }
        // const stmtName = ptr(utf8e.encode("test"));
        // const paramValues = parameters.map((p) => ptr(utf8e.encode(p)));
        // const paramLengths = parameters.map((p) => p.length);
        // const paramFormats = parameters.map((p) => 0);
        // const res = libpq.PQexecPrepared(
        //   this.#conn,
        //   stmtName,
        //   parameters.length,
        //   paramValues,
        //   null,
        //   null,
        //   0
        // );
        // console.log({ res });
        // if (res === 0) {
        //   reject(libpq.PQerrorMessage(this.#conn));
        // }
        // const status = libpq.PQresultStatus(res);
        // if (status !== libpqConstants.PGRES_TUPLES_OK) {
        //   reject(libpq.PQresultErrorMessage(res));
        // }
        // const rowCount = libpq.PQntuples(res);
        // const rows: R[] = [];
        // for (let i = 0; i < rowCount; i++) {
        //   const row = {} as R;
        //   for (let j = 0; j < libpq.PQnfields(res); j++) {
        //     row[libpq.PQfname(res, j)] = libpq.PQgetvalue(res, i, j);
        //   }
        //   rows.push(row);
        // }
        // libpq.PQclear(res);
        // resolve({
        //   command: "SELECT",
        //   rowCount,
        //   rows,
        // });
      });
    }
    throw new Error("cursors not implemented.");
  }

  release(): void {
    // throw new Error("Method not implemented.");
  }
}

export class Pool implements PostgresPool {
  #conn: number;
  constructor(options: {}) {}
  async connect(): Promise<PostgresPoolClient> {
    if (!this.#conn) {
      const connArray = utf8e.encode("dbname=postgres");
      const conn = libpq.PQconnectdb(connArray);
      const status = libpq.PQstatus(conn);
      if (status !== libpqConstants.CONNECTION_OK) {
        throw new Error("connection failed");
      }
      this.#conn = conn;
    }
    return new BunPostgresPoolClient(this.#conn);
  }

  async end(): Promise<void> {
    libpq.PQfinish(this.#conn);
  }
}
