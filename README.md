# pgbun

https://github.com/oven-sh/bun/issues/159#:~:text=Explore%20a%20libpq%2Dbased%20implementation

## libpq

https://www.postgresql.org/docs/current/libpq-build.html

```bash
pg_config --includedir
cc -c -I/opt/homebrew/include/postgresql@14 play.c

pg_config --libdir
cc -o play play.o -L/opt/homebrew/lib/postgresql@14 -lpq
```
