import { bench, run } from "mitata";
import Libpq from "libpq";
import { sqls } from "../sqls.mjs";

const pq = new Libpq();

pq.connectSync("dbname=postgres");

for (const sql of sqls) {
  bench(`node-libpq: \`${sql}\``, () => {
    const res = pq.exec(sql);
    pq.clear(res);
  });
}

await run({ percentiles: false });

pq.finish();
