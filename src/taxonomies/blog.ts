import { BlogCategory, BlogSlug, BlogSubCategoryUnknownKey } from '@/types/Blog';

export namespace BlogTaxonomy {
  export const category = 'categ';
  export const subCategory = 'subcateg';
  export const slug = 'slug';
}

export type TBlogTaxonomy = {
  [BlogTaxonomy.category]: BlogCategory;
  [BlogTaxonomy.subCategory]: BlogSubCategoryUnknownKey;
  [BlogTaxonomy.slug]: BlogSlug;
};

export default BlogTaxonomy;
