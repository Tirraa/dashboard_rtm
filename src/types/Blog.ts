import { BlogCategory } from '@/config/blog';
import BlogTaxonomy, { TBlogTaxonomy } from '@/taxonomies/blog';
import PostBase from './BlogPostAbstractions';
import { i18nParams } from './Next';

export type BlogSubCategory = string;
export type BlogSlug = string;

type BlogPostPagePropsParams = {
  [BlogTaxonomy.category]: BlogCategory;
  [BlogTaxonomy.subCategory]: BlogSubCategory;
  [BlogTaxonomy.slug]: BlogSlug;
};

type BlogSubCategoryPagePropsParams = {
  [BlogTaxonomy.category]: BlogCategory;
  [BlogTaxonomy.subCategory]: BlogSubCategory;
};

type BlogCategoryPagePropsParams = {
  [BlogTaxonomy.category]: BlogCategory;
};

export interface BlogCategoryPageProps {
  params: BlogCategoryPagePropsParams & i18nParams;
}

export interface BlogSubCategoryPageProps {
  params: BlogSubCategoryPagePropsParams & i18nParams;
}

export interface BlogPostPageProps {
  params: BlogPostPagePropsParams & i18nParams;
}

type AllPostsGetter = () => PostBase[];
export type PostsCollectionAssoc<T extends string> = {
  [_ in T]: AllPostsGetter;
};

export type AllPostsTypesAssoc = Record<BlogCategory, PostsCollectionAssoc<BlogSubCategory>>;
export type BlogStaticParamsValue = string;
export type BlogStaticParams = {
  [_ in keyof TBlogTaxonomy]: BlogStaticParamsValue;
};

export type ForcedBlogSubCategoriesPaths = Partial<Record<BlogCategory, string[]>>;
