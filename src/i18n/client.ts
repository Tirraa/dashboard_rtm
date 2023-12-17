import { createI18nClient } from 'next-international/client';

import GENERATED_LOCALES_OBJ from './getLocales';

export const {
  useI18n: getClientSideI18n,
  I18nProviderClient,
  useCurrentLocale,
  useChangeLocale,
  useScopedI18n
} = createI18nClient(GENERATED_LOCALES_OBJ);
