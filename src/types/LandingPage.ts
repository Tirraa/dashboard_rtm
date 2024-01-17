import type { TLandingPageTaxonomy } from '##/config/taxonomies/landingPages';

import type { I18nParams } from './Next';

export type UnknownLandingPageSlug = string;

type LandingPagePropsParams = TLandingPageTaxonomy;

export interface LandingPageProps {
  params: LandingPagePropsParams & I18nParams;
}
