<h1 align=center>postgres-bun</h1>
<div align=center>fast <a href=https://www.postgresql.org/>postgres</a> bindings for bun runtime (libpq ffi)</div>

<br />

only tested on my mac for now.

The shared library is currently hard coded:

```ts
const path = `/usr/local/pgsql/lib/libpq.${suffix}`;
```

### Install

`bun add postgres-bun`

### Benchmark

Make sure you have postgres installed.

```bash
bun install
cd ./benches/node-libpq && npm install && cd ../..
bun bench
```

### is this the fastest??

not sure yet.

<!-- ![bun todos](media/libpq-socket-todos.png) -->

https://github.com/oven-sh/bun/issues/159

getting started with the latter, will hopefully get to the former so we can benchmark.

![jarred on discord](media/libpq-vs-socket.png)

### Credits

- https://github.com/duckdb/duckdb
