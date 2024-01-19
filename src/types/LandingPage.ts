/* v8 ignore start */
// Stryker disable all
import type { TLandingPageTaxonomy } from '##/config/taxonomies/landingPages';
import type LandingPages from '@rtm/generated/LandingPages';
import type { DEFAULT_LANGUAGE } from '##/config/i18n';

import type { I18nParams } from './Next';

type LandingPagePropsParams = TLandingPageTaxonomy;

type LpLanguageAndSlugPair = {
  [Category in keyof LandingPages]: {
    [Lang in keyof LandingPages[Category]]: {
      lang: Lang extends 'DEFAULT_LANGUAGE' ? typeof DEFAULT_LANGUAGE : Lang;
      slug: LandingPages[Category][Lang];
    };
  }[keyof LandingPages[Category]];
}[keyof LandingPages];

export interface LandingPageProps {
  params: LandingPagePropsParams & I18nParams;
}

export type UnknownLandingPageSlug = string;
export type LandingPageLang = LpLanguageAndSlugPair['lang'];
export type LandingPageSlug<Lang extends LandingPageLang> = Extract<LpLanguageAndSlugPair, { lang: Lang }>['slug'];
export type LandingPageCategory = keyof LandingPages;
// Stryker restore all
/* v8 ignore stop */
