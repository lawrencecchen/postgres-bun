import { libpq } from "../src/lib";
import { run, bench } from "mitata";

const utf8e = new TextEncoder();

const conn = libpq.PQconnectdb(utf8e.encode("dbname=postgres"));

function execSync(sql: string) {
  const res = libpq.PQexec(conn, utf8e.encode(sql));
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

bench("postgres-bun `select 1`", () => {
  execSync("select 1;");
});

// bench("postgres-bun `generate_series(1, 100000)`", async () => {
//   execSync(`select i, i as a from generate_series(1, 100000) s(i)`);
// });

await run({ percentiles: false });

libpq.PQfinish(conn);
