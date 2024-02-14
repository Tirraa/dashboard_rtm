/* v8 ignore start */
// Stryker disable all

import { createI18nServer } from 'next-international/server';

import GENERATED_LOCALES_OBJ from './getLocales';

export const { getI18n: getServerSideI18n, getCurrentLocale, getStaticParams, getScopedI18n } = createI18nServer(GENERATED_LOCALES_OBJ);

// Stryker restore all
/* v8 ignore stop */
