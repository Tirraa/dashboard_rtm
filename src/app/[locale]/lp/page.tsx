/* v8 ignore start */
// Stryker disable all
import type { I18nPageProps } from '@/types/Next';

import { setStaticParamsLocale } from 'next-international/server';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getStaticParams } from '@/i18n/server';
import ROUTES_ROOTS from '##/config/routes';
import { redirect } from 'next/navigation';

export function generateStaticParams() {
  return getStaticParams();
}

export default function Page({ params }: I18nPageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  redirect(ROUTES_ROOTS.WEBSITE);
}
// Stryker restore all
/* v8 ignore stop */
