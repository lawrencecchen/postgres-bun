import { bench, run } from "mitata";
import Client from "pg-native";
import { sqls } from "../sqls.mjs";

const client = new Client();

client.connectSync();

for (const sql of sqls) {
  bench(`pg-native \`${sql}\``, async () => {
    client.querySync(sql);
  });
}

// bench("pg-native `select 1`", () => {
//   const ans = client.querySync(`select 1`);
// });
// bench("pg-native `generate_series(1, 100000)`", () => {
//   client.querySync(`select i, i as a from generate_series(1, 100000) s(i)`);
// });

await run({ percentiles: false });

await client.end();
