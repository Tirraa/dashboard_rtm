import { BlogArchitecture } from '@/config/blog';
import BlogTaxonomy, { TBlogTaxonomy } from '@/taxonomies/blog';
import { PostSchema } from 'contentlayer/generated';
import { RequiredFieldsOnly } from './CustomUtilitaryTypes';
import { i18nParams } from './Next';
import { LanguageFlag } from './i18n';

type ContentLayerPhantomType = 'type';
export type PostBase = Omit<PostSchema, ContentLayerPhantomType>;

export type BlogCategory = keyof BlogArchitecture;

export type BlogSubcategoryFromUnknownCategory = BlogArchitecture[BlogCategory];

export type UnknownBlogSlug = string;

type BlogPostPagePropsParams = RequiredFieldsOnly<TBlogTaxonomy>;
type BlogCategoryPagePropsParams = Pick<TBlogTaxonomy, 'categ'>;

type BlogSubcategoryPagePropsParams = {
  [BlogTaxonomy.CATEGORY]: BlogCategory;
  [BlogTaxonomy.SUBCATEGORY]: BlogSubcategoryFromUnknownCategory;
};

export interface BlogCategoryPageProps {
  params: BlogCategoryPagePropsParams & i18nParams;
}

export interface BlogSubcategoryPageProps {
  params: BlogSubcategoryPagePropsParams & i18nParams;
}

export interface BlogPostPageProps {
  params: BlogPostPagePropsParams & i18nParams;
}

export interface BlogPostProps {
  post: PostBase;
  lng: LanguageFlag;
}

type AllPostsGetter = () => PostBase[];
export type PostsCollectionAssoc<T extends BlogCategory> = {
  [_ in T]: AllPostsGetter;
};

type BlogStaticParamsValue = string;
export type BlogStaticParams = {
  [_ in keyof TBlogTaxonomy]: BlogStaticParamsValue;
};

export type UnknownCategoryAndUnknownSubcategory = {
  category: BlogCategory;
  subcategory: BlogSubcategoryFromUnknownCategory;
};

type BlogSubcategoryMappedToBlogCategory = {
  [C in BlogCategory]: BlogArchitecture[C];
};

type BlogSubcategories<C extends BlogCategory> = BlogSubcategoryMappedToBlogCategory[C];

export type ForcedBlogSubcategoriesPaths = {
  [C in BlogCategory]?: BlogSubcategories<C>[];
};

export type BlogCategoryAndSubcategoriesPair<C extends BlogCategory> = {
  category: C;
  subcategory: BlogSubcategories<C>;
};
