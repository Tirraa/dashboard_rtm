/* v8 ignore start */
// Stryker disable all

import type { LandingPageTaxonomyType } from '##/config/taxonomies/landingPages';
import type { LandingPages } from '@rtm/generated';

import type { I18nParams } from './Next';

type LandingPagePropsParams = LandingPageTaxonomyType;

export interface LandingPageProps {
  params: LandingPagePropsParams & I18nParams;
}

export type UnknownLandingPageSlug = string;
export type UnknownLandingPageCategory = string;
export type LandingPageCategory = keyof LandingPages;

// Stryker restore all
/* v8 ignore stop */
