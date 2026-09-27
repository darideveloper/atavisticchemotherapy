/// <reference types="astro/client" />

// Client-exposed env must use the PUBLIC_ prefix. This is a no-backend
// project, so there are no PUBLIC_* readers yet — keep this interface empty.
// (SITE_URL is server-only and read via process.env, never import.meta.env.)
interface ImportMetaEnv {
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Server-only vars (injected or .env) keep their Node-side typing.
declare namespace NodeJS {
  interface ProcessEnv {
    readonly SITE_URL?: string
    readonly PORT?: string
    readonly HOST?: string
    readonly PORTLESS_URL?: string
  }
}