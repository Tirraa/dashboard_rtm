import { BlogsArchitectures } from '@/config/blog';
import BlogTaxonomy, { TBlogTaxonomy } from '@/taxonomies/blog';
import PostBase from './BlogPostAbstractions';
import { i18nParams } from './Next';

export type BlogCategory = keyof BlogsArchitectures;

type SanitizedBlogSubCategory = {
  [K in BlogCategory]: K extends keyof BlogsArchitectures ? BlogsArchitectures[K] : never;
};

export type BlogSubCategory<K extends keyof SanitizedBlogSubCategory> = SanitizedBlogSubCategory[K];
export type BlogSubCategoryUnknownKey = SanitizedBlogSubCategory[keyof SanitizedBlogSubCategory];

export type BlogSlug = string;

type BlogPostPagePropsParams = {
  [BlogTaxonomy.category]: BlogCategory;
  [BlogTaxonomy.subCategory]: BlogSubCategoryUnknownKey;
  [BlogTaxonomy.slug]: BlogSlug;
};

type BlogSubCategoryPagePropsParams = {
  [BlogTaxonomy.category]: BlogCategory;
  [BlogTaxonomy.subCategory]: BlogSubCategoryUnknownKey;
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

export type ForcedBlogSubCategoriesPaths = {
  [K in BlogCategory]?: BlogSubCategory<K>[];
};

type BlogStaticParamsValue = string;
export type BlogStaticParams = {
  [_ in keyof TBlogTaxonomy]: BlogStaticParamsValue;
};

export type CategoryAndSubcategory<C extends BlogCategory> = {
  category: C;
  subCategory: BlogSubCategory<C>;
};
