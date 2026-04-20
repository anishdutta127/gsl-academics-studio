// No-op stand-in for the `server-only` package, used by vitest only.
// `server-only` throws on import inside client modules. In tests we are not
// rendering the React client/server graph, so we replace the module with this
// empty file via vitest.config.ts > resolve.alias.
export {};
