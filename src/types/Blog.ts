/* v8 ignore start */
// Stryker disable all

import type { WithClassname, WithLanguage, Href } from '@rtm/shared-types/Next';
import type { KeySeparator } from '@rtm/shared-types/CustomUtilityTypes';
import type { BlogTaxonomyType } from '##/config/taxonomies/blog';
import type { BlogPostSchema } from 'contentlayer/generated';
import type BlogTaxonomy from '##/config/taxonomies/blog';
import type { BlogArchitecture } from '@rtm/generated';
import type { Id } from '@rtm/shared-types/Numbers';
import type { ReactElement } from 'react';

import type BlogAdapter from './adapters/BlogAdapter';
import type { I18nParams } from './Next';

type ContentlayerPhantomTypeKey = 'type';
export type BlogPostType = Omit<BlogPostSchema, ContentlayerPhantomTypeKey>;

export type BlogCategory = keyof BlogArchitecture;
export type BlogSubcategoryFromUnknownCategory = BlogArchitecture[BlogCategory];
export type UnknownBlogSlug = string;
export type BlogTagId = Id;

export type BlogPostPreviewComponentWithMetadatas = Pick<BlogPostType, 'tagsIndexes' | 'language' | 'title' | 'date' | 'tags' | '_id'> & {
  blogPostPreviewComp: ReactElement;
};

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

export interface BlogPostProps extends Partial<WithClassname>, WithLanguage {
  post: BlogPostType;
}

export type BlogCategoriesAndSubcategoriesAssoc = {
  [__BlogCategory in keyof BlogArchitecture]: `${__BlogCategory}${KeySeparator}${BlogArchitecture[__BlogCategory]}`;
}[keyof BlogArchitecture];

type AllPostsGetter = () => Promise<BlogPostType[]>;
export type PostsCollectionAssoc = Record<BlogCategory, AllPostsGetter>;

type BlogStaticParamsValue = string;
export type BlogStaticParams = Record<keyof BlogTaxonomyType, BlogStaticParamsValue>;

export type BlogCategoriesOGPictures = Record<keyof BlogAdapter, Href[]>;

export type BlogSubcategoriesOGPictures = {
  [Categ in keyof BlogAdapter]: BlogAdapter[Categ] extends object
    ? {
        [_ in keyof BlogAdapter[Categ]]: Href[];
      }
    : never;
};

export type StrictBlogPost = {
  [Category in keyof BlogAdapter]: {
    [Subcategory in keyof BlogAdapter[Category]]: {
      [Language in keyof BlogAdapter[Category][Subcategory]]: {
        slug: BlogAdapter[Category][Subcategory][Language];
        subcategory: Subcategory;
        category: Category;
        lang: Language;
      };
    }[keyof BlogAdapter[Category][Subcategory]];
  }[keyof BlogAdapter[Category]];
}[keyof BlogAdapter];

export { type BlogAdapter };

// Stryker restore all
/* v8 ignore stop */
