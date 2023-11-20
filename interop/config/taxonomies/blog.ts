import type { LanguageFlag } from '##/types/hell/i18n';
import type { BlogCategory, BlogSubcategoryFromUnknownCategory, UnknownBlogSlug } from '@/types/Blog';
import type I18nTaxonomy from './i18n';

export namespace BlogTaxonomy {
  export const CATEGORY = 'categ';
  export const SUBCATEGORY = 'subcateg';
  export const SLUG = 'slug';
}

export type TBlogTaxonomy = {
  [BlogTaxonomy.CATEGORY]: BlogCategory;
  [BlogTaxonomy.SUBCATEGORY]: BlogSubcategoryFromUnknownCategory;
  [BlogTaxonomy.SLUG]: UnknownBlogSlug;
  [I18nTaxonomy.LANGUAGE]: LanguageFlag;
};

export default BlogTaxonomy;
