/* v8 ignore start */
// Stryker disable all

import type { PageProps } from '@/types/Page';
import type { Metadata } from 'next';

import buildPageTitle from '@rtm/shared-lib/portable/str/buildPageTitle';
import PageTaxonomy from '##/config/taxonomies/pages';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getServerSideI18n } from '@/i18n/server';
import { notFound } from 'next/navigation';
import { i18ns } from '##/config/i18n';

import doGetPageStaticParams from './static/getPageStaticParams';
import isSkippedPath from './static/helpers/isSkippedPath';
import { getPageByLanguageAndPathUnstrict } from './api';

export function getPageStaticParams() {
  const pageStaticParams = doGetPageStaticParams();
  return pageStaticParams;
}

export async function getPageMetadatas({ params }: PageProps): Promise<Metadata> {
  const [path, language] = [params[PageTaxonomy.PATH].join('/'), params[I18nTaxonomy.LANGUAGE]];
  if (isSkippedPath(path)) notFound();

  const page = getPageByLanguageAndPathUnstrict(language, path);
  if (!page) notFound();

  const globalT = await getServerSideI18n();
  const { metadescription: description, title: pageTitle, seo } = page;

  const { vocab } = i18ns;
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), pageTitle);

  // {ToDo} Generate languages alternates
  // https://github.com/Tirraa/dashboard_rtm/issues/58#issuecomment-2103311665

  if (seo === undefined) return { description, title };

  const { alternates, openGraph, robots } = seo;
  return { description, alternates, openGraph, robots, title };
}

// Stryker restore all
/* v8 ignore stop */
