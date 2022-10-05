import { libpq } from "../src/lib";
import { run, bench } from "mitata";

const utf8e = new TextEncoder();

const conn = libpq.PQconnectdb(utf8e.encode("dbname=postgres"));

const sqls = [
  "select 1",
  // `select i, i as a from generate_series(1, 100000) s(i)`,
];

for (const sql of sqls) {
  const encoded = utf8e.encode(sql);
  bench(`bun-libpq: \`${sql}\``, () => {
    const res = libpq.PQexec(conn, encoded);
    libpq.PQclear(res);
  });
}

await run({ percentiles: false });

libpq.PQfinish(conn);
