import { libpq } from "../src/lib";
import { run, bench } from "mitata";
import { sqls } from "./sqls.mjs";

const utf8e = new TextEncoder();

const conn = libpq.PQconnectdb(utf8e.encode("dbname=postgres"));

function execSync(sql: Uint8Array) {
  const res = libpq.PQexec(conn, sql);
  const status = libpq.PQresultStatus(res);
  if (status !== 2) {
    throw new Error("error");
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

  return rows;
}

for (const sql of sqls) {
  const encoded = utf8e.encode(sql);
  bench(`postgres-bun \`${sql}\``, async () => {
    execSync(encoded);
  });
}

await run({ percentiles: false });

libpq.PQfinish(conn);
