// Centralized typed business data. One file per domain; this is the brand
// truth for SEO (origin canonical, contact, socials, hours).
// Values are placeholders — replace without touching markup.
// TODO(replace): real contact/socials when available.

const origin = (
  process.env.PORTLESS_URL ??
  process.env.SITE_URL ??
  'https://quimioterapia-atavistica.org'
).replace(/\/+$/, '')

export const BUSINESS_DATA = {
  url: origin,
  name: 'Atavistic Chemotherapy',
  legalName: 'The Atavistic Chemotherapy Clinical Trial',
  logo: '/favicon.svg',
  ogImage: '/og-image.jpg',
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
    // Add a schema.org PostalAddress and GeoCoordinates only when verified.
    // Empty values and 0,0 are invalid business data in structured metadata.
    address: null,
    geo: null,
  },
  // Values must use Schema.org OpeningHoursSpecification objects.
  hours: [],
  socialLinks: [],
} as const
