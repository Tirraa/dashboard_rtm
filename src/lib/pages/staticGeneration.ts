import type { AlternateURLs } from 'next/dist/lib/metadata/types/alternative-urls-types';
import type { MaybeUndefined, Couple } from '@rtm/shared-types/CustomUtilityTypes';
import type { I18nMiddlewareConfig, LanguageFlag } from '@rtm/shared-types/I18n';
import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import type { UnknownPagePath, PageProps } from '@/types/Page';
import type { Href } from '@rtm/shared-types/Next';
import type { Page } from 'contentlayer/generated';
import type { Metadata } from 'next';

import buildPageTitle from '@rtm/shared-lib/portable/str/buildPageTitle';
import { DEFAULT_LANGUAGE, LANGUAGES, i18ns } from '##/config/i18n';
import PageTaxonomy from '##/config/taxonomies/pages';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getServerSideI18n } from '@/i18n/server';
import { notFound } from 'next/navigation';

import doGetPageStaticParams from './static/getPageStaticParams';
import isSkippedPath from './static/helpers/isSkippedPath';
import { getPageByLanguageAndPathUnstrict } from './api';
import { getPathnameWithoutI18nFlag } from '../i18n';

/* v8 ignore start */
// Stryker disable all
export function getPageStaticParams() {
  const pageStaticParams = doGetPageStaticParams();
  return pageStaticParams;
}
/* v8 ignore stop */
// Stryker restore all

// {ToDo} Write tests
function getXDefaultAndCanonical(
  currentPage: Page,
  path: UnknownPagePath,
  language: LanguageFlag,
  middlewareStrategy: I18nMiddlewareConfig['urlMappingStrategy']
): Couple<MaybeUndefined<Href>, Href> {
  const maybeDefaultLanguagePage = getPageByLanguageAndPathUnstrict(language, path);

  const defaultUrl = middlewareStrategy !== 'redirect' ? getPathnameWithoutI18nFlag(currentPage.url) : currentPage.url;

  const xDefault = language !== DEFAULT_LANGUAGE && maybeDefaultLanguagePage !== null ? defaultUrl : undefined;

  const canonical = language === DEFAULT_LANGUAGE ? defaultUrl : currentPage.url;
  return [xDefault, canonical];
}

export async function getPageMetadatas(
  { params }: PageProps,
  middlewareStrategy: I18nMiddlewareConfig['urlMappingStrategy'],
  metadataBase: MaybeUndefined<URL> = process.env.METADABASE_URL ? new URL(process.env.METADABASE_URL) : undefined
): Promise<Metadata> {
  const [path, language] = [params[PageTaxonomy.PATH].join('/'), params[I18nTaxonomy.LANGUAGE]];
  if (isSkippedPath(path)) notFound();

  const currentPage = getPageByLanguageAndPathUnstrict(language, path);
  if (!currentPage) notFound();

  const globalT = await getServerSideI18n();
  const { metadescription: description, title: pageTitle, seo } = currentPage;

  const { vocab } = i18ns;
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), pageTitle);

  const alternateLanguages = LANGUAGES.filter((lang) => lang !== language);
  const languages = {} as Record<LanguageFlag | 'x-default', Href>;

  for (const alternateLanguage of alternateLanguages) {
    const maybePage = getPageByLanguageAndPathUnstrict(alternateLanguage, path);
    if (maybePage === null) continue;
    languages[alternateLanguage] = maybePage.url;
  }

  const maybeDefaultLanguagePage = getPageByLanguageAndPathUnstrict(DEFAULT_LANGUAGE, path);
  if (maybeDefaultLanguagePage !== null) languages['x-default'] = getPathnameWithoutI18nFlag(currentPage.url);

  const [xDefault, canonical] = getXDefaultAndCanonical(currentPage, path, language, middlewareStrategy);
  if (xDefault !== undefined) languages['x-default'] = xDefault;

  const defaultOpenGraph: OpenGraph = { url: currentPage.url };
  if (seo === undefined) return { alternates: { canonical, languages }, openGraph: defaultOpenGraph, metadataBase, description, title };

  const { openGraph = defaultOpenGraph, alternates, robots } = seo;

  if ((openGraph as OpenGraph).url === undefined) (openGraph as OpenGraph).url = currentPage.url;
  if (alternates) (alternates as AlternateURLs).languages = languages;
  if (alternates && !alternates.canonical) (alternates as AlternateURLs).canonical = canonical;

  return { metadataBase, description, alternates, openGraph, robots, title };
}
