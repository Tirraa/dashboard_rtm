type Config = Partial<{
  i18nSubcategoriesRequiredExtraFields: string[];
  i18nCategoriesRequiredExtraFields: string[];
  defaultLanguageTokenTypeStr: string;
  maxPageTaxonomyLen: number;
  maxBlogTaxonomyLen: number;
  maxLpTaxonomyLen: number;
}>;

export default Config;
