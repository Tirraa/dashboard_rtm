/* v8 ignore start */
// Stryker disable all
import type { KeySeparator } from '@rtm/shared-types/CustomUtilityTypes';
import type BlogArchitecture from '@rtm/generated/BlogArchitecture';
import type { TBlogTaxonomy } from '##/config/taxonomies/blog';
import type { WithClassname } from '@rtm/shared-types/Next';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type BlogTaxonomy from '##/config/taxonomies/blog';
import type { PostSchema } from 'contentlayer/generated';
import type { DEFAULT_LANGUAGE } from '##/config/i18n';
import type Blog from '@rtm/generated/Blog';

import type { I18nParams } from './Next';

type ContentLayerPhantomType = 'type';
export type TBlogPost = Omit<PostSchema, ContentLayerPhantomType>;

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

type BlogPostPagePropsParams = TBlogTaxonomy;

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
  post: TBlogPost;
}

export type BlogCategoriesAndSubcategoriesAssoc = {
  [__BlogCategory in keyof BlogArchitecture]: `${__BlogCategory}${KeySeparator}${BlogArchitecture[__BlogCategory]}`;
}[keyof BlogArchitecture];

type AllPostsGetter = () => Promise<TBlogPost[]>;
export type PostsCollectionAssoc = Record<BlogCategory, AllPostsGetter>;

type BlogStaticParamsValue = string;
export type BlogStaticParams = Record<keyof TBlogTaxonomy, BlogStaticParamsValue>;

export type StrictBlog = {
  [Category in keyof Blog]: {
    [Subcategory in keyof Blog[Category]]: {
      [Language in keyof Blog[Category][Subcategory] as Language extends 'DEFAULT_LANGUAGE'
        ? typeof DEFAULT_LANGUAGE
        : Language]: Blog[Category][Subcategory][Language];
    };
  };
};
// Stryker restore all
/* v8 ignore stop */
