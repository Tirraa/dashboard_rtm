/* v8 ignore start */
// Stryker disable all

import type { Limit } from '@rtm/shared-types/Numbers';

type Config = Partial<{
  i18nSubcategoriesRequiredExtraFields: string[];
  i18nCategoriesRequiredExtraFields: string[];
  defaultLanguageKey: string;
  maxPageTaxonomyLen: Limit;
  maxBlogTaxonomyLen: Limit;
  maxLpTaxonomyLen: Limit;
}>;

export default Config;

// Stryker restore all
/* v8 ignore stop */
