export const getLocales = () => ({
  fr: () => import('./locales/fr'),
  en: () => import('./locales/en')
});
