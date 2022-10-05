import postgres from "postgres";
import { run, bench } from "mitata";

const sql = postgres({ host: "localhost", port: 5432, database: "postgres" });

bench("postgres-js `select 1`", async () => {
  await sql`select 1`;
});

// bench("postgres-js `generate_series(1, 100000)`", async () => {
//   await sql`select i, i as a from generate_series(1, 100000) s(i)`;
// });

await run({ percentiles: false });

await sql.end();
