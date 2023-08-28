import { BlogCategory } from '@/config/blog';
import { BlogSlug, BlogSubCategory } from '@/types/Blog';

export namespace BlogTaxonomy {
  export const category = 'categ';
  export const subCategory = 'subcateg';
  export const slug = 'slug';
}

export type TBlogTaxonomy = {
  [BlogTaxonomy.category]: BlogCategory;
  [BlogTaxonomy.subCategory]: BlogSubCategory;
  [BlogTaxonomy.slug]: BlogSlug;
};

export default BlogTaxonomy;
