import { createI18nServer } from 'next-international/server';
import GENERATED_LOCALES_OBJ from './getLocales';

export const { getI18n: getServerSideI18n, getScopedI18n, getStaticParams, getCurrentLocale } = createI18nServer(GENERATED_LOCALES_OBJ);
