/* v8 ignore start */
// Stryker disable all

import type { KeySeparator } from '@rtm/shared-types/CustomUtilityTypes';
import type BlogArchitecture from '@rtm/generated/BlogArchitecture';
import type { BlogTaxonomyType } from '##/config/taxonomies/blog';
import type { BlogPostSchema } from 'contentlayer/generated';
import type { WithClassname } from '@rtm/shared-types/Next';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type BlogTaxonomy from '##/config/taxonomies/blog';

import type StrictBlog from './adapters/StrictBlog';
import type { I18nParams } from './Next';

type ContentlayerPhantomType = 'type';
export type BlogPostType = Omit<BlogPostSchema, ContentlayerPhantomType>;

export type BlogCategory = keyof BlogArchitecture;
export type BlogSubcategoryFromUnknownCategory = BlogArchitecture[BlogCategory];
export type UnknownBlogSlug = string;

type BlogCategoryPagePropsParams = {
  [BlogTaxonomy.CATEGORY]: BlogCategory;
};

type BlogSubcategoryPagePropsParams = {
  [BlogTaxonomy.SUBCATEGORY]: BlogSubcategoryFromUnknownCategory;
  [BlogTaxonomy.CATEGORY]: BlogCategory;
};

type BlogPostPagePropsParams = BlogTaxonomyType;

export interface BlogCategoryPageProps {
  params: BlogCategoryPagePropsParams & I18nParams;
}

export interface BlogSubcategoryPageProps {
  params: BlogSubcategoryPagePropsParams & I18nParams;
}

export interface BlogPostPageProps {
  params: BlogPostPagePropsParams;
}

export interface BlogPostProps extends Partial<WithClassname> {
  language: LanguageFlag;
  post: BlogPostType;
}

export type BlogCategoriesAndSubcategoriesAssoc = {
  [__BlogCategory in keyof BlogArchitecture]: `${__BlogCategory}${KeySeparator}${BlogArchitecture[__BlogCategory]}`;
}[keyof BlogArchitecture];

type AllPostsGetter = () => Promise<BlogPostType[]>;
export type PostsCollectionAssoc = Record<BlogCategory, AllPostsGetter>;

type BlogStaticParamsValue = string;
export type BlogStaticParams = Record<keyof BlogTaxonomyType, BlogStaticParamsValue>;

export { type StrictBlog };

// Stryker restore all
/* v8 ignore stop */
