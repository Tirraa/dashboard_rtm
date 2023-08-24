import BlogTaxonomy from '@/taxonomies/blog';
import PostBase from './BlogPostAbstractions';

export type BlogCategory = 'patch-notes' & string;

export type PatchPostSubCategory = ('dashboard' | 'discord-bot') & string;

export type BlogSubCategory = PatchPostSubCategory & string;
export type BlogSlug = string;

export interface BlogPostProps {
  params: {
    [BlogTaxonomy.subCategory]: BlogSubCategory;
    [BlogTaxonomy.slug]: BlogSlug;
  };
}

export interface BlogSubCategoryPageProps {
  params: {
    [BlogTaxonomy.subCategory]: BlogSubCategory;
  };
}

export type AllPostsGetter = () => PostBase[];

export type PostsCollectionAssoc<T extends string> = {
  [_ in T]: AllPostsGetter;
};
