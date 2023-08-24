import BlogTaxonomy from '../_taxonomies/blog';
import PostBase from './BlogPostAbstractions';

export type PatchPostCategory = ('dashboard' | 'discord-bot') & string;

export type BlogCategory = PatchPostCategory & string;
export type BlogSlug = string;

export interface BlogPostProps {
  params: {
    [BlogTaxonomy.category]: BlogCategory;
    [BlogTaxonomy.slug]: BlogSlug;
  };
  postsCollection: PostBase[];
}

export interface BlogLayoutProps {
  params: {
    [BlogTaxonomy.category]: BlogCategory;
  };
}

export type AllPostsGetter = () => PostBase[];

export type PostsCollectionAssoc<T extends string> = {
  [_ in T]: AllPostsGetter;
};
