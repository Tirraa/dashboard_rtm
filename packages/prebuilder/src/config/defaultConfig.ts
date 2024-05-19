/* v8 ignore start */
// Stryker disable all

import type Config from '../types/Config';

const defaultConfig: Required<Config> = {
  i18nBlogSubcategoriesRequiredExtraFields: [],
  i18nBlogCategoriesRequiredExtraFields: [],
  defaultLanguageKey: 'DEFAULT_LANGUAGE',
  maxPageTaxonomyLen: 80,
  maxBlogTaxonomyLen: 34,
  maxLpTaxonomyLen: 128
};

export default defaultConfig;

// Stryker restore all
/* v8 ignore stop */
