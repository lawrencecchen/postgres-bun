#include "libpq-fe.h"
#include <stdio.h>
#include <stdlib.h>

static void exit_nicely(PGconn *conn) {
  PQfinish(conn);
  exit(1);
}

int main(int argc, char **argv) {
  const char *conninfo;
  PGconn *conn;
  PGresult *res;
  int nFields;
  int i, j;

  /* Make a connection to the database */
  conninfo = "dbname = postgres";

  conn = PQconnectdb(conninfo);

  /* Check to see that the backend connection was successfully made */
  if (PQstatus(conn) != CONNECTION_OK) {
    fprintf(stderr, "Connection to database failed: %s", PQerrorMessage(conn));
    exit_nicely(conn);
  }

  res = PQexec(conn, "SELECT pg_catalog.set_config('search_path', '', false)");

  if (PQresultStatus(res) != PGRES_TUPLES_OK) {
    fprintf(stderr, "SET failed: %s", PQerrorMessage(conn));
    PQclear(res);
    exit_nicely(conn);
  }

  PQclear(res);

  res = PQexec(conn, "select 123");
  nFields = PQnfields(res);
  for (i = 0; i < nFields; i++) {
    printf("%-15s", PQfname(res, i));
  }
  printf("\n\n");

  /* next, print out the rows */
  for (i = 0; i < PQntuples(res); i++) {
    for (j = 0; j < nFields; j++)
      printf("%-15s", PQgetvalue(res, i, j));
    printf("\n");
  }

  PQclear(res);

  /* close the connection to the database and cleanup */
  PQfinish(conn);
  return 0;
}