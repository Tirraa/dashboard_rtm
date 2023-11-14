import type BlogTaxonomy from '##/config/taxonomies/blog';
import type { TBlogTaxonomy } from '##/config/taxonomies/blog';
import type { LanguageFlag } from '##/types/hell/i18n';
import type { BlogArchitecture } from '@/config/blog';
import type { PostSchema } from 'contentlayer/generated';
import type { RequiredFieldsOnly } from './CustomUtilitaryTypes';
import type { I18nParams } from './Next';

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
  params: BlogCategoryPagePropsParams & I18nParams;
}

export interface BlogSubcategoryPageProps {
  params: BlogSubcategoryPagePropsParams & I18nParams;
}

export interface BlogPostPageProps {
  params: BlogPostPagePropsParams & I18nParams;
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
