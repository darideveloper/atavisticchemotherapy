// Centralized typed business data. One file per domain; this is the brand
// truth for SEO (origin canonical, contact, socials, hours).
// Values are placeholders — replace without touching markup.
// TODO(replace): real contact/socials when available.

const origin = (
  process.env.PORTLESS_URL ??
  process.env.SITE_URL ??
  'https://atavisticchemotherapy.com'
).replace(/\/+$/, '')

export const BUSINESS_DATA = {
  url: origin,
  name: 'Atavistic Chemotherapy',
  legalName: 'The Atavistic Chemotherapy Clinical Trial',
  logo: '/favicon.svg',
  ogImage: '/og-atavistic-chemotherapy-formal.png',
  contact: {
    phone: '+13013059591',
    phoneDisplay: '+1 (301) 305-9591',
    email: '',
    whatsapp: {
      username: {
        label: '+1 (301) 305-9591',
        url: 'https://wa.me/13013059591',
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
