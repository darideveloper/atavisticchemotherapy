import en from '@/messages/en.json'
import es from '@/messages/es.json'

export const languages = {
	en: 'English',
	es: 'Español',
}

export const defaultLang = 'en'

export const supportedLangs = Object.keys(languages) as Array<keyof typeof languages>

export const ui = {
	en,
	es,
} as const