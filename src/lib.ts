import { dlopen, suffix } from "bun:ffi";

const path = `/usr/local/pgsql/lib/libpq.${suffix}`;

export const _libpq = dlopen(path, {
  PQconnectdbParams: {
    args: ["ptr", "ptr", "int"],
    returns: "ptr",
  },
  PQconnectdb: {
    args: ["ptr"],
    returns: "ptr",
  },
  PQsetdbLogin: {
    args: ["ptr", "ptr", "ptr", "ptr", "ptr", "ptr", "ptr"],
    returns: "ptr",
  },
  // FIXME:
  // "This is a macro that calls PQsetdbLogin with null pointers for the login and pwd parameters. It is provided for backward compatibility with very old programs."
  // does bun ffi support macros?
  // PQsetdb: {
  //   args: ['ptr', 'ptr', 'ptr', 'ptr', 'ptr'],
  //   returns: 'ptr',
  // },
  PQconnectStartParams: {
    args: ["ptr", "ptr", "int"],
    returns: "ptr",
  },
  PQconnectStart: {
    args: ["ptr"],
    returns: "ptr",
  },
  PQconnectPoll: {
    args: ["ptr"],
    returns: "int",
  },
  PQconndefaults: {
    args: [],
    returns: "ptr",
  },
  PQconninfo: {
    args: ["ptr"],
    returns: "ptr",
  },
  PQconninfoParse: {
    args: ["ptr", "ptr"],
    returns: "ptr",
  },
  PQfinish: {
    args: ["ptr"],
    returns: "void",
  },
  PQreset: {
    args: ["ptr"],
    returns: "void",
  },
  PQresetStart: {
    args: ["ptr"],
    returns: "int",
  },
  PQresetPoll: {
    args: ["ptr"],
    returns: "int",
  },
  PQpingParams: {
    args: ["ptr", "ptr", "int"],
    returns: "int",
  },
  PQping: {
    args: ["ptr"],
    returns: "int",
  },
  // TODO: needs bun support for callback functions
  // PQsetSSLKeyPassHook_OpenSSL: {}
  PQgetSSLKeyPassHook_OpenSSL: {
    args: [],
    returns: "ptr",
  },
  // Connection Status Functions
  // https://www.postgresql.org/docs/current/libpq-status.html
  PQdb: {
    args: ["ptr"],
    returns: "cstring",
  },
  PQuser: {
    args: ["ptr"],
    returns: "cstring",
  },
  PQpass: {
    args: ["ptr"],
    returns: "cstring",
  },
  PQhost: {
    args: ["ptr"],
    returns: "cstring",
  },
  PQhostaddr: {
    args: ["ptr"],
    returns: "cstring",
  },
  PQport: {
    args: ["ptr"],
    returns: "cstring",
  },
  // no PQtty
  PQoptions: {
    args: ["ptr"],
    returns: "cstring",
  },
  PQstatus: {
    args: ["ptr"],
    returns: "int",
  },
  PQtransactionStatus: {
    args: ["ptr"],
    returns: "int",
  },
  PQparameterStatus: {
    args: ["ptr", "ptr"],
    returns: "cstring",
  },
  PQprotocolVersion: {
    args: ["ptr"],
    returns: "int",
  },
  PQserverVersion: {
    args: ["ptr"],
    returns: "int",
  },
  PQerrorMessage: {
    args: ["ptr"],
    returns: "cstring",
  },
  PQsocket: {
    args: ["ptr"],
    returns: "int",
  },
  PQbackendPID: {
    args: ["ptr"],
    returns: "int",
  },
  PQconnectionNeedsPassword: {
    args: ["ptr"],
    returns: "int",
  },
  PQconnectionUsedPassword: {
    args: ["ptr"],
    returns: "int",
  },
  PQsslInUse: {
    args: ["ptr"],
    returns: "int",
  },
  PQsslAttribute: {
    args: ["ptr", "ptr"],
    returns: "cstring",
  },
  PQsslAttributeNames: {
    args: ["ptr"],
    returns: "ptr",
  },
  PQsslStruct: {
    args: ["ptr", "ptr"],
    returns: "void",
  },
  PQgetssl: {
    args: ["ptr", "ptr"],
    returns: "void",
  },
  // Command Execution Functions
  // https://www.postgresql.org/docs/current/libpq-exec.html
  PQexec: {
    args: ["ptr", "ptr"],
    returns: "ptr",
  },
  PQexecParams: {
    args: ["ptr", "ptr", "int", "ptr", "ptr", "ptr", "ptr", "int"],
    returns: "ptr",
  },
  PQprepare: {
    args: ["ptr", "ptr", "ptr", "int", "ptr"],
    returns: "ptr",
  },
  PQexecPrepared: {
    args: ["ptr", "ptr", "int", "ptr", "ptr", "ptr", "int"],
    returns: "ptr",
  },
  PQdescribePrepared: {
    args: ["ptr", "ptr"],
    returns: "ptr",
  },
  PQdescribePortal: {
    args: ["ptr", "ptr"],
    returns: "ptr",
  },
  PQresultStatus: {
    args: ["ptr"],
    returns: "int",
  },
  PQresStatus: {
    args: ["int"],
    returns: "cstring",
  },
  PQresultErrorMessage: {
    args: ["ptr"],
    returns: "cstring",
  },
  PQresultVerboseErrorMessage: {
    args: ["ptr", "int", "int"],
    returns: "cstring",
  },
  PQresultErrorField: {
    args: ["ptr", "int"],
    returns: "cstring",
  },
  PQclear: {
    args: ["ptr"],
    returns: "void",
  },
  PQntuples: {
    args: ["ptr"],
    returns: "int",
  },
  PQnfields: {
    args: ["ptr"],
    returns: "int",
  },
  PQfname: {
    args: ["ptr", "int"],
    returns: "cstring",
  },
  PQfnumber: {
    args: ["ptr", "ptr"],
    returns: "int",
  },
  PQftable: {
    args: ["ptr", "int"],
    returns: "int",
  },
  PQftablecol: {
    args: ["ptr", "int"],
    returns: "int",
  },
  PQfformat: {
    args: ["ptr", "int"],
    returns: "int",
  },
  PQftype: {
    args: ["ptr", "int"],
    returns: "int",
  },
  PQfmod: {
    args: ["ptr", "int"],
    returns: "int",
  },
  PQfsize: {
    args: ["ptr", "int"],
    returns: "int",
  },
  PQbinaryTuples: {
    args: ["ptr"],
    returns: "int",
  },
  PQgetvalue: {
    args: ["ptr", "int", "int"],
    returns: "cstring",
  },
  PQgetisnull: {
    args: ["ptr", "int", "int"],
    returns: "int",
  },
  PQgetlength: {
    args: ["ptr", "int", "int"],
    returns: "int",
  },
  PQnparams: {
    args: ["ptr"],
    returns: "int",
  },
  PQparamtype: {
    args: ["ptr", "int"],
    returns: "int",
  },
  PQprint: {
    args: ["ptr", "ptr", "ptr"], // todo: verify this
  },
  PQcmdStatus: {
    args: ["ptr"],
    returns: "cstring",
  },
  PQcmdTuples: {
    args: ["ptr"],
    returns: "cstring",
  },
  PQoidValue: {
    args: ["ptr"],
    returns: "int",
  },
  PQoidStatus: {
    args: ["ptr"],
    returns: "cstring",
  },
  PQescapeLiteral: {
    args: ["ptr", "ptr", "int"],
    returns: "cstring",
  },
  PQescapeIdentifier: {
    args: ["ptr", "ptr", "int"],
    returns: "cstring",
  },
  PQescapeStringConn: {
    args: ["ptr", "ptr", "ptr", "int", "ptr"], // todo: verify this
    returns: "int",
  },
  PQescapeString: {
    args: ["ptr", "ptr", "int"],
    returns: "int",
  },
  PQescapeByteaConn: {
    args: ["ptr", "ptr", "int", "ptr"],
    returns: "ptr", // todo: can this be cstring?
  },
  PQescapeBytea: {
    args: ["ptr", "int", "ptr"],
    returns: "ptr", // todo: can this be cstring?
  },
  PQunescapeBytea: {
    args: ["ptr", "ptr"],
    returns: "ptr", // todo: can this be cstring?
  },
  // Asynchronous Command Processing
  PQsendQuery: {
    args: ["ptr", "ptr"],
    returns: "int",
  },
  PQsendQueryParams: {
    args: ["ptr", "ptr", "int", "ptr", "ptr", "ptr", "ptr", "int"],
    returns: "int",
  },
  PQsendPrepare: {
    args: ["ptr", "ptr", "ptr", "int", "ptr"],
    returns: "int",
  },
  PQsendQueryPrepared: {
    args: ["ptr", "ptr", "int", "ptr", "ptr", "ptr", "int"],
  },
  PQsendDescribePrepared: {
    args: ["ptr", "ptr"],
    returns: "int",
  },
  PQsendDescribePortal: {
    args: ["ptr", "ptr"],
    returns: "int",
  },
  PQgetResult: {
    args: ["ptr"],
    returns: "ptr",
  },
  PQconsumeInput: {
    args: ["ptr"],
    returns: "int",
  },
  PQisBusy: {
    args: ["ptr"],
    returns: "int",
  },
  PQsetnonblocking: {
    args: ["ptr", "int"],
    returns: "int",
  },
  PQisnonblocking: {
    args: ["ptr"],
    returns: "int",
  },
  PQflush: {
    args: ["ptr"],
    returns: "int",
  },
  // Pipeline Mode
  // https://www.postgresql.org/docs/current/libpq-pipeline-mode.html
  PQpipelineStatus: {
    args: ["ptr"],
    returns: "int",
  },
  PQenterPipelineMode: {
    args: ["ptr"],
    returns: "int",
  },
  PQexitPipelineMode: {
    args: ["ptr"],
    returns: "int",
  },
  PQpipelineSync: {
    args: ["ptr"],
    returns: "int",
  },
  PQsendFlushRequest: {
    args: ["ptr"],
    returns: "int",
  },
  // Retrieving Query Results Row-by-Row
  // https://www.postgresql.org/docs/current/libpq-single-row-mode.html
  PQsetSingleRowMode: {
    args: ["ptr"],
    returns: "int",
  },
  // Canceling Queries in Progress
  // https://www.postgresql.org/docs/current/libpq-cancel.html
  PQgetCancel: {
    args: ["ptr"],
    returns: "ptr",
  },
  PQfreeCancel: {
    args: ["ptr"],
    returns: "void",
  },
  PQcancel: {
    args: ["ptr", "ptr", "int"],
    returns: "int",
  },
  PQrequestCancel: {
    args: ["ptr"],
    returns: "int",
  },
  // The Fast-Path Interface
  // todo: should we implement this?
  // ...
  // Asynchronous Notification
  PQnotifies: {
    args: ["ptr"],
    returns: "ptr",
  },
  // Functions Associated with the COPY Command
  // https://www.postgresql.org/docs/current/libpq-copy.html
  PQputCopyData: {
    args: ["ptr", "ptr", "int"],
    returns: "int",
  },
  PQputCopyEnd: {
    args: ["ptr", "ptr"],
    returns: "int",
  },
  PQgetCopyData: {
    args: ["ptr", "ptr", "int"],
    returns: "int",
  },
  // obsolute functions for copy are not implemented
  // ...
  // Control Functions
  // https://www.postgresql.org/docs/current/libpq-control.html
  PQclientEncoding: {
    args: ["ptr"],
    returns: "int",
  },
  PQsetClientEncoding: {
    args: ["ptr", "ptr"],
    returns: "int",
  },
  PQsetErrorVerbosity: {
    args: ["ptr", "int"],
    returns: "int",
  },
  PQsetErrorContextVisibility: {
    args: ["ptr", "int"],
    returns: "int",
  },
  PQtrace: {
    args: ["ptr", "ptr"],
    returns: "void",
  },
  PQsetTraceFlags: {
    args: ["ptr", "int"],
    returns: "void",
  },
  PQuntrace: {
    args: ["ptr"],
    returns: "void",
  },
  // Miscellaneous Functions
  // https://www.postgresql.org/docs/current/libpq-misc.html
  PQfreemem: {
    args: ["ptr"],
    returns: "void",
  },
  PQconninfoFree: {
    args: ["ptr"],
    returns: "void",
  },
  PQencryptPasswordConn: {
    args: ["ptr", "ptr", "ptr", "ptr"],
    returns: "ptr",
  },
  PQencryptPassword: {
    args: ["ptr", "ptr"],
    returns: "ptr",
  },
  PQmakeEmptyPGresult: {
    args: ["ptr", "int"],
    returns: "ptr",
  },
  PQfireResultCreateEvents: {
    args: ["ptr", "ptr"],
    returns: "void",
  },
  PQcopyResult: {
    args: ["ptr", "int"],
    returns: "ptr",
  },
  PQsetResultAttrs: {
    args: ["ptr", "int", "ptr"],
    returns: "int",
  },
  PQsetvalue: {
    args: ["ptr", "int", "int", "ptr", "int"],
    returns: "int",
  },
  PQresultAlloc: {
    args: ["ptr", "int"],
    returns: "ptr",
  },
  PQresultMemorySize: {
    args: ["ptr"],
    returns: "int",
  },
  PQlibVersion: {
    args: [],
    returns: "int",
  },
  // TODO: https://www.postgresql.org/docs/current/libpq-notice-processing.html
  // TODO: https://www.postgresql.org/docs/current/libpq-events.html
});

export const libpq = _libpq.symbols;

export const libpqConstants = {
  CONNECTION_OK: 0,
  CONNECTION_BAD: 1,
  PGRES_EMPTY_QUERY: 0,
  PGRES_COMMAND_OK: 1,
  PGRES_TUPLES_OK: 2,
};
// { ..._libpq.symbols, CONNECTION_OK: 0, CONNECTION_BAD: 1 };

// export
// function main() {
//   const enc = new TextEncoder();
//   const connArray = enc.encode("dbname=postgres");
//   const conn = _libpq.symbols.PQconnectdb(connArray);
//   console.log("conn:", conn);
//   const status = _libpq.symbols.PQstatus(conn);
//   console.log("status:", status);
//   const db = _libpq.symbols.PQdb(conn);
//   console.log("db:", db);
//   const user = _libpq.symbols.PQuser(conn);
//   console.log("user:", user);
//   const protocolVersion = _libpq.symbols.PQprotocolVersion(conn);
//   console.log("protocol version:", protocolVersion);
//   const serverVersion = _libpq.symbols.PQserverVersion(conn);
//   console.log("server version:", serverVersion);
//   const res = _libpq.symbols.PQexec(conn, enc.encode("select 12311"));
//   console.log("res:", res);
//   const nFields = _libpq.symbols.PQnfields(res);
//   console.log("nFields:", nFields);
//   for (let i = 0; i < nFields; i++) {
//     const fname = _libpq.symbols.PQfname(res, i);
//     console.log(fname);
//   }
//   for (let i = 0; i < _libpq.symbols.PQntuples(res); i++) {
//     for (let j = 0; j < nFields; j++) {
//       const value = _libpq.symbols.PQgetvalue(res, i, j);
//       console.log(value);
//     }
//   }
// }

// main();
