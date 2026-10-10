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
	cookies: {
		en: 'cookies',
		es: 'es/cookies',
	},
	'medical-disclaimer': {
		en: 'medical-disclaimer',
		es: 'es/aviso-medico',
	},
	'legal-notice': {
		en: 'legal-notice',
		es: 'es/aviso-legal',
	},
} as const

export type PageKey = keyof typeof routes