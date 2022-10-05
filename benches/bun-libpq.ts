import { libpq } from "../src/lib";
import { run, bench } from "mitata";
import { sqls } from "./sqls.mjs";

const utf8e = new TextEncoder();

const conn = libpq.PQconnectdb(utf8e.encode("dbname=postgres"));

for (const sql of sqls) {
  const encoded = utf8e.encode(sql);
  bench(`bun-libpq: \`${sql}\``, () => {
    const res = libpq.PQexec(conn, encoded);
    libpq.PQclear(res);
  });
}

await run({ percentiles: false });

libpq.PQfinish(conn);
