import { Kysely, PostgresDialect, sql } from "kysely";
import { bench, run } from "mitata";
import pkg from "pg";
const { Pool } = pkg;

const db = new Kysely({
  dialect: new PostgresDialect({
    pool: new Pool({ host: "localhost", port: 5432, database: "postgres" }),
  }),
});

bench("kysely-node `select 1`", async () => {
  await sql`select 1`.execute(db);
});
bench("kysely-node `generate_series(1, 100000)`", async () => {
  await sql`select i, i as a from generate_series(1, 100000) s(i)`.execute(db);
});

await run({ percentiles: false });

await db.destroy();
