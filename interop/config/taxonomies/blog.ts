import type { LanguageFlag } from '##/types/magic/I18n';
import type { BlogCategory, BlogSubcategoryFromUnknownCategory, UnknownBlogSlug } from '@/types/Blog';
import type I18nTaxonomy from './i18n';

namespace BlogTaxonomy {
  export const CATEGORY = 'categ';
  export const SUBCATEGORY = 'subcateg';
  export const SLUG = 'slug';
}

export type TBlogTaxonomy = {
  [I18nTaxonomy.LANGUAGE]: LanguageFlag;
  [BlogTaxonomy.CATEGORY]: BlogCategory;
  [BlogTaxonomy.SUBCATEGORY]: BlogSubcategoryFromUnknownCategory;
  [BlogTaxonomy.SLUG]: UnknownBlogSlug;
};

export default BlogTaxonomy;
