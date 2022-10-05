export const sqls = [
  "select 1",
  `select i, i as a from generate_series(1, 100000) s(i)`,
];
