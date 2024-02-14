/* v8 ignore start */
// Stryker disable all

import type Config from '../types/Config';

const defaultConfig: Required<Config> = {
  i18nSubcategoriesRequiredExtraFields: [],
  defaultLanguageKey: 'DEFAULT_LANGUAGE',
  i18nCategoriesRequiredExtraFields: [],
  maxPageTaxonomyLen: 80,
  maxBlogTaxonomyLen: 34,
  maxLpTaxonomyLen: 128
};

export default defaultConfig;

// Stryker restore all
/* v8 ignore stop */
