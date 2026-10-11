import { defaultLang, ui } from '@/lib/i18n/ui'
import { routes, type PageKey } from '@/lib/i18n/routes'

export function getLangFromUrl(_url: URL) {
	return defaultLang
}

export function getLocalizedPath(pageKey: PageKey) {
	const path = routes[pageKey]
	return path === '' ? '/' : `/${path}`
}

export function getPageKeyFromUrl(url: URL): PageKey | null {
	const pathname =
		url.pathname.length > 1 ? url.pathname.replace(/\/$/, '') : url.pathname
	for (const key of Object.keys(routes) as PageKey[]) {
		if (getLocalizedPath(key) === pathname) return key
	}
	return null
}

export function getTranslations(_lang: keyof typeof ui = defaultLang) {
	return function t(key: string, vars?: Record<string, string>) {
		const keys = key.split('.')
		let value: any = ui[defaultLang]

		for (const k of keys) {
			value = value?.[k]
			if (value === undefined) break
		}

		if (value === undefined && import.meta.env.DEV) {
			console.error(`[i18n] Missing translation key: "${key}"`)
			return `MISSING: ${key}`
		}

		if (typeof value === 'string' && vars) {
			Object.entries(vars).forEach(([k, v]) => {
				value = value.replace(new RegExp(`{${k}}`, 'g'), v)
			})
		}

		return value
	}
}
