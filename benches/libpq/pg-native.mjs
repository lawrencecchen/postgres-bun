import { bench, run } from "mitata";
import Client from "pg-native";

const client = new Client();

client.connectSync();

bench("pg-native `select 1`", () => {
  const ans = client.querySync(`select 1`);
});
// bench("pg-native `generate_series(1, 100000)`", () => {
//   client.querySync(`select i, i as a from generate_series(1, 100000) s(i)`);
// });

await run({ percentiles: false });

await client.end();
