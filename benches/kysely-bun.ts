import { Kysely, PostgresDialect, sql } from "kysely";
import { Pool } from "../src/kysely/pool";
import { run, bench } from "mitata";

interface DB {}

const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({}),
  }),
});

bench("kysely-bun `select 1`", async () => {
  await sql.raw("select 123").execute(db);
});
bench("kysely-bun `generate_series(1, 100000)`", async () => {
  await sql`select i, i as a from generate_series(1, 100000) s(i)`.execute(db);
});

await run({ percentiles: false });

await db.destroy();

// async function main() {
//   // const result = await sql`select * from information_schema.columns;`.execute(
//   //   db
//   // );
//   for (let i = 0; i < 1000; i++) {
//     const result1 = await sql`select 1;`.execute(db);
//     console.log({ result1 });
//   }
//   // const result2 = await sql`select 2;`.execute(db);
//   // console.log({ result1, result2 });
// }
// main();
