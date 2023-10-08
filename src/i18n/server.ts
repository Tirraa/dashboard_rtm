import { createI18nServer } from 'next-international/server';
import LOCALES_OBJ from './getLocales';

export const { getI18n: getServerSideI18n, getScopedI18n, getStaticParams } = createI18nServer(LOCALES_OBJ);
