import es from '@/messages/es.json'

export const languages = {
	es: 'Español',
}

export const defaultLang = 'es'

export const supportedLangs = Object.keys(languages) as Array<keyof typeof languages>

export const ui = {
	es,
} as const
