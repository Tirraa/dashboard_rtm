import { BlogCategory, BlogSubCategory } from '@/config/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import PostBase from './BlogPostAbstractions';
import { i18nParams } from './Next';

export type BlogSlug = string;

type BlogPostPagePropsParams = {
  [BlogTaxonomy.subCategory]: BlogSubCategory;
  [BlogTaxonomy.slug]: BlogSlug;
};

type BlogSubCategoryPagePropsParams = {
  [BlogTaxonomy.subCategory]: BlogSubCategory;
};

export interface BlogPostPageProps {
  params: BlogPostPagePropsParams & i18nParams;
}

export interface BlogPostProps extends BlogPostPageProps {
  [BlogTaxonomy.category]: BlogCategory;
}

export interface BlogSubCategoryPageProps {
  params: BlogSubCategoryPagePropsParams & i18nParams;
}

export interface BlogSubCategoryProps extends BlogSubCategoryPageProps {
  [BlogTaxonomy.category]: BlogCategory;
}

export type AllPostsGetter = () => PostBase[];

export type PostsCollectionAssoc<T extends string> = {
  [_ in T]: AllPostsGetter;
};

export type AllPostsTypesAssoc = Record<BlogCategory, PostsCollectionAssoc<BlogSubCategory>>;
