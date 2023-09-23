import { LocalesGetterConfigObjTypeConstraint } from '@/types/i18n';

export const getLocales = () =>
  ({
    fr: () => import('@/i18n/locales/fr'),
    en: () => import('@/i18n/locales/en')
  } satisfies LocalesGetterConfigObjTypeConstraint);

export default getLocales;
