import type BlogTaxonomy from '##/config/taxonomies/blog';
import type { TBlogTaxonomy } from '##/config/taxonomies/blog';
import type { LanguageFlag } from '##/types/magic/I18n';
import type { BlogArchitecture } from '@/config/blog';
import type { PostSchema } from 'contentlayer/generated';
import type { WithClassname } from 'packages/shared-types/src/Next';
import type { I18nParams } from './Next';

type ContentLayerPhantomType = 'type';
export type PostBase = Omit<PostSchema, ContentLayerPhantomType>;

export type BlogCategory = keyof BlogArchitecture;
export type BlogSubcategoryFromUnknownCategory = BlogArchitecture[BlogCategory];
export type UnknownBlogSlug = string;

type BlogCategoryPagePropsParams = {
  [BlogTaxonomy.CATEGORY]: BlogCategory;
};

type BlogSubcategoryPagePropsParams = {
  [BlogTaxonomy.CATEGORY]: BlogCategory;
  [BlogTaxonomy.SUBCATEGORY]: BlogSubcategoryFromUnknownCategory;
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
  post: PostBase;
  language: LanguageFlag;
}

type AllPostsGetter = () => Promise<PostBase[]>;
export type PostsCollectionAssoc = Record<BlogCategory, AllPostsGetter>;

type BlogStaticParamsValue = string;
export type BlogStaticParams = Record<keyof TBlogTaxonomy, BlogStaticParamsValue>;
