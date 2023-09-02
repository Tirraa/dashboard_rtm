import { BlogsArchitectures } from '@/config/blog';
import { TBlogTaxonomy } from '@/taxonomies/blog';
import PostBase from './BlogPostAbstractions';
import { RequiredFieldsOnly } from './CustomUtilitaryTypes';
import { i18nParams } from './Next';

export type BlogCategory = keyof BlogsArchitectures;

type BlogSubCategoryMappedToBlogCategory = {
  [K in BlogCategory]: BlogsArchitectures[K];
};

export type BlogSubCategory<K extends keyof BlogSubCategoryMappedToBlogCategory> = BlogSubCategoryMappedToBlogCategory[K];
export type BlogSubCategoryFromUnknownCategory = BlogSubCategory<BlogCategory>;

export type BlogSlug = string;

type BlogPostPagePropsParams = RequiredFieldsOnly<TBlogTaxonomy>;
type BlogSubCategoryPagePropsParams = Pick<TBlogTaxonomy, 'categ' | 'subcateg'>;
type BlogCategoryPagePropsParams = Pick<TBlogTaxonomy, 'categ'>;

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
