// Centralized typed business data. One file per domain; this is the brand
// truth for SEO (origin canonical, contact, socials, hours).
// Values are placeholders — replace without touching markup.
// TODO(replace): real contact/socials when available.

const origin =
  process.env.PORTLESS_URL ?? process.env.SITE_URL ?? 'https://atavisticchemotherapy.com'

export const BUSINESS_DATA = {
  url: origin,
  name: 'Atavistic Chemotherapy',
  legalName: 'Atavistic Chemotherapy Trial',
  logo: '/favicon.svg',
  contact: {
    phone: '+13013059591',
    phoneDisplay: '+1 (301) 305-9591',
    email: '',
    whatsapp: {
      username: {
        label: '@FrankArguello7777',
        url: 'https://wa.me/FrankArguello7777',
      },
      mexico: {
        label: 'WhatsApp (656 338 2516)',
        url: 'https://wa.me/526563382516',
      },
    },
    address: {
      street: '',
      city: '',
      region: '',
      country: '',
      zip: '',
    },
    geo: {
      lat: 0,
      lng: 0,
    },
  },
  hours: {
    monday: '9:00-17:00',
    tuesday: '9:00-17:00',
    wednesday: '9:00-17:00',
    thursday: '9:00-17:00',
    friday: '9:00-17:00',
    saturday: 'Closed',
    sunday: 'Closed',
  },
  socialLinks: {
    facebook: '',
    instagram: '',
    youtube: '',
    twitter: '',
  },
} as const
