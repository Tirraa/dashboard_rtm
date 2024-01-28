/* v8 ignore start */
// Stryker disable all
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { LandingPageProps } from '@/types/LandingPage';
import type { LandingPage } from 'contentlayer/generated';

import LandingPageTaxonomy from '##/config/taxonomies/landingPages';
import { buildPageTitle } from '@rtm/shared-lib/str';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getServerSideI18n } from '@/i18n/server';
import { notFound } from 'next/navigation';
import { i18ns } from '##/config/i18n';

import doGetLandingPagesStaticParams from './static/getLandingPagesStaticParams';
import { getLandingPageByLanguageAndSlugUnstrict } from './api';

export async function getLandingPagesStaticParams() {
  const landingPagesStaticParams = await doGetLandingPagesStaticParams();
  return landingPagesStaticParams;
}

export async function getLandingPageMetadatas({ params }: LandingPageProps) {
  const [lang, slug] = [params[I18nTaxonomy.LANGUAGE], params[LandingPageTaxonomy.SLUG]];
  const lp: MaybeNull<LandingPage> = getLandingPageByLanguageAndSlugUnstrict(lang, slug);
  if (!lp) notFound();

  const globalT = await getServerSideI18n();
  const { metadescription: description, title: lpTitle } = lp;

  const { vocab } = i18ns;
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), lpTitle);

  return { description, title };
}
// Stryker restore all
/* v8 ignore stop */
