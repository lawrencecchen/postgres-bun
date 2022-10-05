import { Client } from "https://deno.land/x/postgres@v0.16.1/mod.ts";
import { run, bench } from "https://esm.sh/mitata";

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  database: "postgres",
});
await client.connect();

bench("deno-postgres `select 1`", async () => {
  await client.queryArray(`select 1`);
});

await run({ percentiles: false });

await client.end();
