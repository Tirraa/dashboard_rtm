import { createI18nClient } from 'next-international/client';
import { locales } from './getLocales';

export const { useI18n: getClientSideI18n, useScopedI18n, I18nProviderClient, useCurrentLocale } = createI18nClient(locales);
