bun run ./benches/postgres-bun.ts
node ./benches/libpq/pg-native.mjs
node ./benches/node-postgres.mjs
node ./benches/postgres-js.mjs
deno run --allow-net --allow-env --allow-read --unstable --allow-write --allow-run ./benches/deno-postgres.ts