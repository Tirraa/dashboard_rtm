import { createI18nClient } from 'next-international/client';
import GENERATED_LOCALES_OBJ from './getLocales';

export const {
  useI18n: getClientSideI18n,
  useScopedI18n,
  I18nProviderClient,
  useCurrentLocale,
  useChangeLocale
} = createI18nClient(GENERATED_LOCALES_OBJ);
