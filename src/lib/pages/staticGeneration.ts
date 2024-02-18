/* v8 ignore start */
// Stryker disable all

import type { PageProps } from '@/types/Page';

import PageTaxonomy from '##/config/taxonomies/pages';
import { buildPageTitle } from '@rtm/shared-lib/str';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getServerSideI18n } from '@/i18n/server';
import { notFound } from 'next/navigation';
import { i18ns } from '##/config/i18n';

import doGetPagesStaticParams from './static/getPagesStaticParams';
import isSkippedPath from './static/helpers/isSkippedPath';
import { getPageByLanguageAndPathUnstrict } from './api';

export function getPagesStaticParams() {
  const pagesStaticParams = doGetPagesStaticParams();
  return pagesStaticParams;
}

export async function getPagesMetadatas({ params }: PageProps) {
  const [path, language] = [params[PageTaxonomy.PATH].join('/'), params[I18nTaxonomy.LANGUAGE]];
  if (isSkippedPath(path)) notFound();

  const page = getPageByLanguageAndPathUnstrict(language, path);
  if (!page) notFound();

  const globalT = await getServerSideI18n();
  const { metadescription: description, title: pageTitle } = page;

  const { vocab } = i18ns;
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), pageTitle);

  return { description, title };
}

// Stryker restore all
/* v8 ignore stop */
