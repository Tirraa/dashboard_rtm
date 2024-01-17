/* v8 ignore start */
// Stryker disable all
import type { TLandingPageTaxonomy } from '##/config/taxonomies/landingPages';
import type LandingPages from '@rtm/generated/LandingPages';
import type { DEFAULT_LANGUAGE } from '##/config/i18n';

import type { I18nParams } from './Next';

type LandingPagePropsParams = TLandingPageTaxonomy;

type LpLanguageAndSlugPair = {
  [L in keyof LandingPages[keyof LandingPages]]: {
    lang: L extends 'DEFAULT_LANGUAGE' ? typeof DEFAULT_LANGUAGE : L;
    slug: LandingPages[keyof LandingPages][L];
  };
}[keyof LandingPages[keyof LandingPages]];

export interface LandingPageProps {
  params: LandingPagePropsParams & I18nParams;
}

export type UnknownLandingPageSlug = string;
export type LandingPageLang = LpLanguageAndSlugPair['lang'];
export type LandingPageSlug<L extends LandingPageLang> = Extract<LpLanguageAndSlugPair, { lang: L }>['slug'];
// Stryker restore all
/* v8 ignore stop */
