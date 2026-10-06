/// <reference types="astro/client" />

// PUBLIC_ values are included in the browser bundle. Use only credentials
// intended for a public client; private secrets need a server-side relay.
// (SITE_URL is server-only and read via process.env, never import.meta.env.)
interface ImportMetaEnv {
  readonly PUBLIC_CONTACT_FORM_ENDPOINT?: string
  readonly PUBLIC_CONTACT_FORM_USER?: string
  readonly PUBLIC_CONTACT_FORM_API_KEY?: string
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
