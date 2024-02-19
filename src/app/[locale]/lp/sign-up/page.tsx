/* v8 ignore start */
// Stryker disable all

import type { Page } from 'contentlayer/generated';
import type { I18nPageProps } from '@/types/Next';

import { getServerSideI18n, getStaticParams } from '@/i18n/server';
import { setStaticParamsLocale } from 'next-international/server';
import { getPageByLanguageAndPathStrict } from '@/lib/pages/api';
import MDX from '@/components/layouts/blog/MdxComponent';
import { buildPageTitle } from '@rtm/shared-lib/str';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getServerSession } from 'next-auth';
import ROUTES_ROOTS from '##/config/routes';
import { redirect } from 'next/navigation';
import { i18ns } from '##/config/i18n';

export async function generateMetadata({ params }: I18nPageProps) {
  const globalT = await getServerSideI18n();
  const language = params[I18nTaxonomy.LANGUAGE];

  const document = getPageByLanguageAndPathStrict({ path: 'lp/sign-up', lang: language }) as Page;

  const { vocab } = i18ns;
  const { metadescription: description, title: documentTitle } = document;
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), documentTitle);

  return { description, title };
}

export function generateStaticParams() {
  return getStaticParams();
}

export default async function Page({ params }: I18nPageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  const session = await getServerSession();
  if (session) redirect(ROUTES_ROOTS.DASHBOARD);

  const document = getPageByLanguageAndPathStrict({ path: 'lp/sign-up', lang: language }) as Page;
  return <MDX code={document.body.code} />;
}

// Stryker restore all
/* v8 ignore stop */
