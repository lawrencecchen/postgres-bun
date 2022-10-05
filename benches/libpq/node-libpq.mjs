import { bench, run } from "mitata";
import Libpq from "libpq";

const pq = new Libpq();

pq.connectSync("dbname=postgres");
const sqls = [
  "select 1",
  `select i, i as a from generate_series(1, 100000) s(i)`,
];

for (const sql of sqls) {
  bench(`node-libpq: ${sql}`, () => {
    const res = pq.exec(sql);
    pq.clear(res);
  });
}

await run({ percentiles: false });

pq.finish();
