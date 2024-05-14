/* v8 ignore start */
// Stryker disable all

import type { AlternateURLs } from 'next/dist/lib/metadata/types/alternative-urls-types';
import type { MaybeUndefined, MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { LandingPageProps } from '@/types/LandingPage';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { LandingPage } from 'contentlayer/generated';
import type { Href } from '@rtm/shared-types/Next';
import type { Metadata } from 'next';

import buildPageTitle from '@rtm/shared-lib/portable/str/buildPageTitle';
import LandingPageTaxonomy from '##/config/taxonomies/landingPages';
import InvalidArgumentsError from '##/errors/InvalidArguments';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getServerSideI18n } from '@/i18n/server';
import { LANGUAGES, i18ns } from '##/config/i18n';
import { notFound } from 'next/navigation';

import doGetLandingPagesStaticParams from './static/getLandingPagesStaticParams';
import { invalidMetadataBaseArgumentHint } from '../__internals/vocab';
import { getLandingPageByLanguageAndSlugUnstrict } from './api';

export function getLandingPagesStaticParams() {
  const landingPagesStaticParams = doGetLandingPagesStaticParams();
  return landingPagesStaticParams;
}

/**
 * @throws {InvalidArgumentsError}
 */
export async function getLandingPageMetadatas(
  { params }: LandingPageProps,
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
  const languages = {} as Record<LanguageFlag, Href>;

  for (const maybeAlternateLanguage of maybeAlternateLanguages) {
    const maybeLp = getLandingPageByLanguageAndSlugUnstrict(maybeAlternateLanguage, slug);
    if (maybeLp === null) continue;
    languages[maybeAlternateLanguage] = maybeLp.url;
  }

  // eslint-disable-next-line no-magic-numbers
  const canonical = Object.keys(languages).length === 0 ? currentLp.url : undefined;

  if (seo === undefined) return { alternates: { canonical, languages }, metadataBase, description, title };

  const { alternates, openGraph, robots } = seo;

  if (alternates) (alternates as AlternateURLs).languages = languages;
  if (alternates && !alternates.canonical) (alternates as AlternateURLs).canonical = canonical;

  return { metadataBase, description, alternates, openGraph, robots, title };
}

// Stryker restore all
/* v8 ignore stop */
