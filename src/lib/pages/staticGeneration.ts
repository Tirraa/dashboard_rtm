/* v8 ignore start */
// Stryker disable all

import type { AlternateURLs } from 'next/dist/lib/metadata/types/alternative-urls-types';
import type { MaybeUndefined } from '@rtm/shared-types/CustomUtilityTypes';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { Href } from '@rtm/shared-types/Next';
import type { PageProps } from '@/types/Page';
import type { Metadata } from 'next';

import buildPageTitle from '@rtm/shared-lib/portable/str/buildPageTitle';
import PageTaxonomy from '##/config/taxonomies/pages';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getServerSideI18n } from '@/i18n/server';
import { LANGUAGES, i18ns } from '##/config/i18n';
import { notFound } from 'next/navigation';

import doGetPageStaticParams from './static/getPageStaticParams';
import isSkippedPath from './static/helpers/isSkippedPath';
import { getPageByLanguageAndPathUnstrict } from './api';

export function getPageStaticParams() {
  const pageStaticParams = doGetPageStaticParams();
  return pageStaticParams;
}

export async function getPageMetadatas(
  { params }: PageProps,
  metadataBase: MaybeUndefined<URL> = process.env.METADABASE_URL ? new URL(process.env.METADABASE_URL) : undefined
): Promise<Metadata> {
  const [path, language] = [params[PageTaxonomy.PATH].join('/'), params[I18nTaxonomy.LANGUAGE]];
  if (isSkippedPath(path)) notFound();

  const page = getPageByLanguageAndPathUnstrict(language, path);
  if (!page) notFound();

  const globalT = await getServerSideI18n();
  const { metadescription: description, title: pageTitle, seo } = page;

  const { vocab } = i18ns;
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), pageTitle);

  const alternateLanguages = LANGUAGES.filter((lang) => lang !== language);
  const languages = {} as Record<LanguageFlag, Href>;

  for (const alternateLanguage of alternateLanguages) {
    const page = getPageByLanguageAndPathUnstrict(alternateLanguage, path);
    if (!page) continue;
    languages[alternateLanguage] = page.url;
  }

  if (seo === undefined) return { alternates: { languages }, metadataBase, description, title };

  const { alternates, openGraph, robots } = seo;
  if (alternates) (alternates as AlternateURLs).languages = languages;
  return { metadataBase, description, alternates, openGraph, robots, title };
}

// Stryker restore all
/* v8 ignore stop */
