import { bench, run } from "mitata";
import pkg from "pg";
import { sqls } from "./sqls.mjs";
const { Client } = pkg;

const client = new Client();

await client.connect();

for (const sql of sqls) {
  bench(`node-postgres \`${sql}\``, async () => {
    await client.query(sql);
  });
}

await run({ percentiles: false });

await client.end();
