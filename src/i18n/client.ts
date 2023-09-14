import { createI18nClient } from 'next-international/client';
import getLocales from './getLocales';

export const { useI18n: getClientSideI18n, useScopedI18n, I18nProviderClient } = createI18nClient(getLocales());
