import type { MaybeUndefined, MaybeNull, Couple } from '@rtm/shared-types/CustomUtilityTypes';
import type { AlternateURLs } from 'next/dist/lib/metadata/types/alternative-urls-types';
import type { UnknownLandingPageSlug, LandingPageProps } from '@/types/LandingPage';
import type { I18nMiddlewareConfig, LanguageFlag } from '@rtm/shared-types/I18n';
import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import type { LandingPage } from 'contentlayer/generated';
import type { Href } from '@rtm/shared-types/Next';
import type { Metadata } from 'next';

import buildPageTitle from '@rtm/shared-lib/portable/str/buildPageTitle';
import LandingPageTaxonomy from '##/config/taxonomies/landingPages';
import { DEFAULT_LANGUAGE, LANGUAGES, i18ns } from '##/config/i18n';
import InvalidArgumentsError from '##/errors/InvalidArguments';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getServerSideI18n } from '@/i18n/server';
import { notFound } from 'next/navigation';

import doGetLandingPagesStaticParams from './static/getLandingPagesStaticParams';
import { invalidMetadataBaseArgumentHint } from '../__internals/vocab';
import { getLandingPageByLanguageAndSlugUnstrict } from './api';
import { getPathnameWithoutI18nFlag } from '../i18n';

/* v8 ignore start */
// Stryker disable all
export function getLandingPagesStaticParams() {
  const landingPagesStaticParams = doGetLandingPagesStaticParams();
  return landingPagesStaticParams;
}
/* v8 ignore stop */
// Stryker restore all

// {ToDo} Write tests
function getXDefaultAndCanonical(
  currentLp: LandingPage,
  slug: UnknownLandingPageSlug,
  language: LanguageFlag,
  middlewareStrategy: I18nMiddlewareConfig['urlMappingStrategy']
): Couple<MaybeUndefined<Href>, Href> {
  const maybeDefaultLanguageLp = getLandingPageByLanguageAndSlugUnstrict(language, slug);

  const defaultUrl = middlewareStrategy !== 'redirect' ? getPathnameWithoutI18nFlag(currentLp.url) : currentLp.url;

  const xDefault = language !== DEFAULT_LANGUAGE && maybeDefaultLanguageLp !== null ? defaultUrl : undefined;

  const canonical = language === DEFAULT_LANGUAGE ? defaultUrl : currentLp.url;
  return [xDefault, canonical];
}

/**
 * @throws {InvalidArgumentsError}
 */
export async function getLandingPageMetadatas(
  { params }: LandingPageProps,
  middlewareStrategy: I18nMiddlewareConfig['urlMappingStrategy'],
  metadataBase: MaybeUndefined<URL> = process.env.METADABASE_URL ? new URL(process.env.METADABASE_URL) : undefined
): Promise<Metadata> {
  if (metadataBase === undefined) {
    throw new InvalidArgumentsError(getLandingPageMetadatas.name, { metadataBase }, invalidMetadataBaseArgumentHint);
  }

  const [language, slug] = [params[I18nTaxonomy.LANGUAGE], params[LandingPageTaxonomy.SLUG]];
  const currentLp: MaybeNull<LandingPage> = getLandingPageByLanguageAndSlugUnstrict(language, slug);
  if (!currentLp) notFound();

  const globalT = await getServerSideI18n();
  const { metadescription: description, title: lpTitle, seo } = currentLp;

  const { vocab } = i18ns;
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), lpTitle);

  const maybeAlternateLanguages = LANGUAGES.filter((lang) => lang !== language);
  const languages = {} as Record<LanguageFlag | 'x-default', Href>;

  for (const maybeAlternateLanguage of maybeAlternateLanguages) {
    const maybeLp = getLandingPageByLanguageAndSlugUnstrict(maybeAlternateLanguage, slug);
    if (maybeLp === null) continue;
    languages[maybeAlternateLanguage] = maybeLp.url;
  }

  const [xDefault, canonical] = getXDefaultAndCanonical(currentLp, slug, language, middlewareStrategy);
  if (xDefault !== undefined) languages['x-default'] = xDefault;

  const defaultOpenGraph: OpenGraph = { url: currentLp.url };
  if (seo === undefined) return { alternates: { canonical, languages }, openGraph: defaultOpenGraph, metadataBase, description, title };

  const { openGraph = defaultOpenGraph, alternates, robots } = seo;

  if ((openGraph as OpenGraph).url === undefined) (openGraph as OpenGraph).url = currentLp.url;
  if (alternates) (alternates as AlternateURLs).languages = languages;
  if (alternates && !alternates.canonical) (alternates as AlternateURLs).canonical = canonical;

  return { metadataBase, description, alternates, openGraph, robots, title };
}
