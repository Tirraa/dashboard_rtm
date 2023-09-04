import { createI18nServer } from 'next-international/server';
import { getLocales } from './utils';

export const { getI18n: getServerSideI18n, getScopedI18n, getStaticParams } = createI18nServer(getLocales());
