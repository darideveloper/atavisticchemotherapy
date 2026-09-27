// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
// Config runs under Node — `@/` alias does not resolve here, so import relative.
import { routes } from './src/lib/i18n/routes.ts'

// Legacy redirects: map old prefixed /en/<path> → /<path> (EN is default/unprefixed).
const legacyRedirects = Object.values(routes).reduce((acc, route) => {
	if (route.en === '') {
		acc['/en'] = '/'
	} else {
		acc[`/en/${route.en}`] = `/${route.en}`
	}
	return acc
}, {})

// Config files can't use import.meta.env for .env values, and bare
// process.env can't see .env either — Node 22 loadEnvFile fills CLI-unset
// vars from .env (no new dependency; CLI env wins). Missing .env (e.g.
// Docker) falls through to the fallback.
try {
  if (typeof process.loadEnvFile === 'function') process.loadEnvFile('.env')
} catch {
  // No .env — process.env / fallback below apply.
}

export default defineConfig({
  // Origin chain: per-checkout Portless URL wins in dev (each worktree gets
  // its own branch-subdomain URL), explicit SITE_URL covers Docker/CI builds.
  // Fallback is the prod domain: dev never reaches it (Portless always injects
  // PORTLESS_URL), and a build without env must emit prod — never localhost.
  site: process.env.PORTLESS_URL ?? process.env.SITE_URL ?? 'https://atavisticchemotherapy.com',
  build: {
    inlineStylesheets: 'always',
  },
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4321,
    strictPort: true,
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      port: process.env.PORT ? parseInt(process.env.PORT) : 4321,
      strictPort: true,
    },
  },
  integrations: [
    react(),
    sitemap({
      // Drop paths that should not be indexed (e.g. checkout/thank-you).
      // No such paths yet — placeholder filter for the foundation.
      filter: (pageUrl) => {
        const excluded = ['/checkout', '/thank-you']
        return !excluded.some((p) => pageUrl.includes(p))
      },
    }),
  ],
  redirects: { ...legacyRedirects },
})