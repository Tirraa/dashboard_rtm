import { createI18nClient } from 'next-international/client';
import LOCALES_OBJ from './getLocales';

export const { useI18n: getClientSideI18n, useScopedI18n, I18nProviderClient, useCurrentLocale } = createI18nClient(LOCALES_OBJ);
