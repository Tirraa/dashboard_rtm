import { BlogCategory, BlogSlug, BlogSubCategoryFromUnknownCategory } from '@/types/Blog';
import { LanguageFlag } from '@/types/i18n';
import i18nTaxonomy from './i18n';

export namespace BlogTaxonomy {
  export const category = 'categ';
  export const subCategory = 'subcateg';
  export const slug = 'slug';
}

export type TBlogTaxonomy = {
  [BlogTaxonomy.category]: BlogCategory;
  [BlogTaxonomy.subCategory]: BlogSubCategoryFromUnknownCategory;
  [BlogTaxonomy.slug]: BlogSlug;
  [i18nTaxonomy.langFlag]?: LanguageFlag;
};

export default BlogTaxonomy;
