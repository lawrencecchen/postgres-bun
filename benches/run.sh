# bun run ./benches/postgres-bun.ts
# deno run --allow-net --allow-env --allow-read --unstable --allow-write --allow-run ./benches/deno-postgres.ts
node ./benches/node-postgres.mjs
node ./benches/postgres-js.mjs
# bun run ./benches/postgres-bun.ts
node ./benches/node-libpq/pg-native.mjs
node ./benches/node-libpq/node-libpq.mjs
bun run ./benches/bun-libpq.ts