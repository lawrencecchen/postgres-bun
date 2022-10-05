export const sqls = [
  "select 1",
  `select * from pg_catalog.pg_type where typname = 'bool'`,
  `select i, i as a from generate_series(1, 100000) s(i)`,
  `select * from information_schema.columns`,
  // `WITH RECURSIVE c(x) AS (  VALUES(1)  UNION ALL  SELECT x+1 FROM c WHERE x<100000)SELECT x, x as a FROM c;`,
];
