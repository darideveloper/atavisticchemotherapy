// Localized path mapping. EN is the default language (unprefixed); ES is
// prefixed (`/es`). Home EN path is `""` → root.
export const routes = {
	home: {
		en: '',
		es: 'es',
	},
	privacy: {
		en: 'privacy',
		es: 'es/privacidad',
	},
	terms: {
		en: 'terms',
		es: 'es/terminos',
	},
} as const

export type PageKey = keyof typeof routes