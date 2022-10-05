import postgres from "postgres";
import { run, bench } from "mitata";
import { sqls } from "./sqls.mjs";

const pg = postgres({ host: "localhost", port: 5432, database: "postgres" });

for (const _sql of sqls) {
  bench(`postgres-js \`${_sql}\``, async () => {
    await pg.unsafe(_sql);
  });
}

await run({ percentiles: false });

await pg.end();
