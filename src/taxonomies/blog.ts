import type { BlogCategory, BlogSubcategoryFromUnknownCategory, UnknownBlogSlug } from '@/types/Blog';
import type { LanguageFlag } from '@/types/i18n';
import type i18nTaxonomy from './i18n';

export namespace BlogTaxonomy {
  export const CATEGORY = 'categ';
  export const SUBCATEGORY = 'subcateg';
  export const SLUG = 'slug';
}

export type TBlogTaxonomy = {
  [BlogTaxonomy.CATEGORY]: BlogCategory;
  [BlogTaxonomy.SUBCATEGORY]: BlogSubcategoryFromUnknownCategory;
  [BlogTaxonomy.SLUG]: UnknownBlogSlug;
  [i18nTaxonomy.LANG_FLAG]: LanguageFlag;
};

export default BlogTaxonomy;
