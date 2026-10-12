// Spanish is the sole public language. Home path is `""` → root.
export const routes = {
	home: '',
	privacy: 'privacidad',
	terms: 'terminos',
	cookies: 'cookies',
	'medical-disclaimer': 'aviso-medico',
	'legal-notice': 'aviso-legal',
} as const

export type PageKey = keyof typeof routes
