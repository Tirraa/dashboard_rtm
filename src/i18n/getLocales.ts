import { LocalesGetterConfigObjTypeConstraint } from '@/types/i18n';

const getLocales = () =>
  ({
    fr: () => import('@/i18n/locales/fr'),
    en: () => import('@/i18n/locales/en')
  } satisfies LocalesGetterConfigObjTypeConstraint);

export const locales = getLocales();
export default locales;
