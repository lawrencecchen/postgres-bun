import { bench, run } from "mitata";
import pkg from "pg";
const { Client } = pkg;

const client = new Client();

await client.connect();

bench("node-postgres `select 1`", async () => {
  await client.query(`select 1`);
});
// bench("node-postgres `generate_series(1, 100000)`", async () => {
//   await client.query(`select i, i as a from generate_series(1, 100000) s(i)`);
// });

await run({ percentiles: false });

await client.end();
