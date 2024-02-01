/* v8 ignore start */
// Stryker disable all
import type { TLandingPageTaxonomy } from '##/config/taxonomies/landingPages';
import type LandingPages from '@rtm/generated/LandingPages';

import type LpLanguageAndSlugPair from './adapters/LpLanguageAndSlugPair';
import type { I18nParams } from './Next';

type LandingPagePropsParams = TLandingPageTaxonomy;

export interface LandingPageProps {
  params: LandingPagePropsParams & I18nParams;
}

export type UnknownLandingPageSlug = string;
export type UnknownLandingPageCategory = string;
export type LandingPageLang = LpLanguageAndSlugPair['lang'];
export type LandingPageSlug<Lang extends LandingPageLang> = Extract<LpLanguageAndSlugPair, { lang: Lang }>['slug'];
export type LandingPageCategory = keyof LandingPages;
// Stryker restore all
/* v8 ignore stop */
