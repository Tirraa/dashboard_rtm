import BlogTaxonomy from '@/taxonomies/blog';
import PostBase from './BlogPostAbstractions';

export type BlogCategory = 'patch-notes'; // 'categ1' | 'categ2' | 'categ3'

export type PatchPostSubCategory = 'dashboard' | 'discord-bot';

export type BlogSubCategory = PatchPostSubCategory & string; // (A | B | C | D) & string
export type BlogSlug = string;

export interface BlogPostProps {
  params: {
    [BlogTaxonomy.subCategory]: BlogSubCategory;
    [BlogTaxonomy.slug]: BlogSlug;
  };
  [BlogTaxonomy.category]: BlogCategory;
}

export interface BlogSubCategoryPageProps {
  params: {
    [BlogTaxonomy.subCategory]: BlogSubCategory;
  };
  [BlogTaxonomy.category]: BlogCategory;
}

export type AllPostsGetter = () => PostBase[];

export type PostsCollectionAssoc<T extends string> = {
  [_ in T]: AllPostsGetter;
};

export type AllPostsTypesAssoc = Record<BlogCategory, PostsCollectionAssoc<BlogSubCategory>>;
