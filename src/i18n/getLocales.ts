import { LocalesGetterConfigObjDiscreteType } from '@/types/i18n';

export const getLocales = () =>
  ({
    fr: () => import('@/i18n/locales/fr'),
    en: () => import('@/i18n/locales/en')
  } satisfies LocalesGetterConfigObjDiscreteType);

export default getLocales;
