/* v8 ignore start */
// Stryker disable all
import type { UnknownLandingPageSlug } from '@/types/LandingPage';

namespace LandingPageTaxonomy {
  export const SLUG = 'lp-slug';
}

export type TLandingPageTaxonomy = {
  [LandingPageTaxonomy.SLUG]: UnknownLandingPageSlug; // {ToDo} Codegen
};

export default LandingPageTaxonomy;
// Stryker restore all
/* v8 ignore stop */
