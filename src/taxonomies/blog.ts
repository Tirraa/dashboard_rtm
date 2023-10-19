import { BlogCategory, BlogSubCategoryFromUnknownCategory, UnknownBlogSlug } from '@/types/Blog';
import { LanguageFlag } from '@/types/i18n';
import i18nTaxonomy from './i18n';

export namespace BlogTaxonomy {
  export const CATEGORY = 'categ';
  export const SUBCATEGORY = 'subcateg';
  export const SLUG = 'slug';
}

export type TBlogTaxonomy = {
  [BlogTaxonomy.CATEGORY]: BlogCategory;
  [BlogTaxonomy.SUBCATEGORY]: BlogSubCategoryFromUnknownCategory;
  [BlogTaxonomy.SLUG]: UnknownBlogSlug;
  [i18nTaxonomy.LANG_FLAG]: LanguageFlag;
};

export default BlogTaxonomy;
