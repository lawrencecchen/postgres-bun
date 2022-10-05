import { Client } from "https://deno.land/x/postgres@v0.16.1/mod.ts";
import { run, bench } from "https://esm.sh/mitata";
import { sqls } from "./sqls.mjs";

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  database: "postgres",
});
await client.connect();

for (const sql of sqls) {
  bench(`deno-postgres \`${sql}\``, async () => {
    // await client.queryArray(sql);
    await client.queryObject(sql);
  });
}

await run({ percentiles: false });

await client.end();
