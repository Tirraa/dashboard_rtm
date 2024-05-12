/* v8 ignore start */
// Stryker disable all

import type { AlternateURLs } from 'next/dist/lib/metadata/types/alternative-urls-types';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { LandingPageProps } from '@/types/LandingPage';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { LandingPage } from 'contentlayer/generated';
import type { Href } from '@rtm/shared-types/Next';
import type { Metadata } from 'next';

import buildPageTitle from '@rtm/shared-lib/portable/str/buildPageTitle';
import LandingPageTaxonomy from '##/config/taxonomies/landingPages';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getServerSideI18n } from '@/i18n/server';
import { LANGUAGES, i18ns } from '##/config/i18n';
import { notFound } from 'next/navigation';

import doGetLandingPagesStaticParams from './static/getLandingPagesStaticParams';
import { getLandingPageByLanguageAndSlugUnstrict } from './api';

export function getLandingPagesStaticParams() {
  const landingPagesStaticParams = doGetLandingPagesStaticParams();
  return landingPagesStaticParams;
}

export async function getLandingPageMetadatas({ params }: LandingPageProps): Promise<Metadata> {
  const [language, slug] = [params[I18nTaxonomy.LANGUAGE], params[LandingPageTaxonomy.SLUG]];
  const lp: MaybeNull<LandingPage> = getLandingPageByLanguageAndSlugUnstrict(language, slug);
  if (!lp) notFound();

  const globalT = await getServerSideI18n();
  const { metadescription: description, title: lpTitle, seo } = lp;

  const { vocab } = i18ns;
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), lpTitle);

  const alternateLanguages = LANGUAGES.filter((lang) => lang !== language);
  const languages = {} as Record<LanguageFlag, Href>;

  for (const alternateLanguage of alternateLanguages) {
    const lp = getLandingPageByLanguageAndSlugUnstrict(alternateLanguage, slug);
    if (!lp) continue;
    languages[alternateLanguage] = lp.url;
  }

  if (seo === undefined) return { alternates: { languages }, description, title };

  const { alternates, openGraph, robots } = seo;
  if (alternates) (alternates as AlternateURLs).languages = languages;
  return { description, alternates, openGraph, robots, title };
}

// Stryker restore all
/* v8 ignore stop */
