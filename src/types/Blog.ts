import { BlogArchitecture } from '@/config/blog';
import BlogTaxonomy, { TBlogTaxonomy } from '@/taxonomies/blog';
import PostBase from './BlogPostAbstractions';
import { RequiredFieldsOnly } from './CustomUtilitaryTypes';
import { i18nParams } from './Next';

export type BlogCategory = keyof BlogArchitecture;

type BlogSubCategoriesMappedToBlogCategory = {
  [K in BlogCategory]: BlogArchitecture[K];
};
type BlogSubCategories<K extends BlogCategory> = BlogSubCategoriesMappedToBlogCategory[K];

export type BlogSubCategoryFromUnknownCategory = BlogSubCategories<BlogCategory>;
export type BlogSubCategoryUnknownKey = BlogArchitecture[keyof BlogArchitecture];

export type BlogSlug = string;

type BlogPostPagePropsParams = RequiredFieldsOnly<TBlogTaxonomy>;
type BlogCategoryPagePropsParams = Pick<TBlogTaxonomy, 'categ'>;

type BlogSubCategoryPagePropsParams = {
  [BlogTaxonomy.CATEGORY]: BlogCategory;
  [BlogTaxonomy.SUBCATEGORY]: BlogSubCategoriesMappedToBlogCategory[BlogCategory];
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
export type PostsCollectionAssoc<T extends BlogCategory> = {
  [_ in T]: AllPostsGetter;
};

export type ForcedBlogSubCategoriesPaths = {
  [K in BlogCategory]?: BlogSubCategories<K>[];
};

type BlogStaticParamsValue = string;
export type BlogStaticParams = {
  [_ in keyof TBlogTaxonomy]: BlogStaticParamsValue;
};

export type UnknownCategoryAndUnknownSubCategory = {
  category: BlogCategory;
  subCategory: BlogSubCategoryFromUnknownCategory;
};

export type BlogCategoryAndSubcategoriesPair<C extends BlogCategory> = {
  category: C;
  subCategory: BlogSubCategories<C>;
};
