import { defaultLang, supportedLangs, ui } from '@/lib/i18n/ui'
import { routes, type PageKey } from '@/lib/i18n/routes'

export function getLangFromUrl(url: URL) {
	const [, firstSegment] = url.pathname.split('/')
	if (
		(supportedLangs as string[]).includes(firstSegment) &&
		firstSegment !== defaultLang
	)
		return firstSegment
	return defaultLang
}

export function getLocalizedPath(pageKey: PageKey, lang: keyof typeof ui) {
	const path = routes[pageKey]?.[lang]
	return path === undefined || path === '' ? '/' : `/${path}`
}

export function getPageKeyFromUrl(url: URL): PageKey | null {
	const lang = getLangFromUrl(url)
	const pathname =
		url.pathname.length > 1 ? url.pathname.replace(/\/$/, '') : url.pathname
	for (const [key, localized] of Object.entries(routes)) {
		if (getLocalizedPath(key as PageKey, lang) === pathname) return key as PageKey
	}
	return null
}

export function getTranslations(lang: keyof typeof ui) {
	return function t(key: string, vars?: Record<string, string>) {
		const keys = key.split('.')
		let value: any = ui[lang]

		for (const k of keys) {
			value = value?.[k]
			if (value === undefined) break
		}

		if (value === undefined) {
			let fallbackValue: any = ui[defaultLang]
			for (const k of keys) {
				fallbackValue = fallbackValue?.[k]
				if (fallbackValue === undefined) break
			}
			value = fallbackValue

			if (value === undefined) {
				if (import.meta.env.DEV) {
					console.error(`[i18n] Missing translation key: "${key}"`)
					return `MISSING: ${key}`
				}
			}
		}

		if (typeof value === 'string' && vars) {
			Object.entries(vars).forEach(([k, v]) => {
				value = value.replace(new RegExp(`{${k}}`, 'g'), v)
			})
		}

		return value
	}
}