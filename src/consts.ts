// Centralized site/business constants.
// BUSINESS_DATA lives in @/data/site-config — these are the final SEO
// fallbacks only (re-exported when no prop/i18n value resolves).

export const SITE_TITLE = 'Atavistic Chemotherapy'
export const SITE_DESCRIPTION =
  'Second-opinion evaluation for the Atavistic Chemotherapy trial (NCT02366884).'

export const LOCALE_MAP = {
  en: 'en_US',
  es: 'es_ES',
} as const