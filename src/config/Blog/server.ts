import type { BlogSubcategoriesOGPictures, BlogCategoriesOGPictures, PostsCollectionAssoc, BlogCategory } from '@/types/Blog';
import type { StringsCompareFun } from '@rtm/shared-types/StringManipulations';
import type { DatesCompareFun } from '@rtm/shared-types/DateManipulations';
import type { Limit } from '@rtm/shared-types/Numbers';

import { categoriesBlogDataAssoc } from '##/config/contentlayer/blog/documentTypes';

import type { FiltersAssoc } from './client';

import BlogConfigClient from './client';

export type BlogConfigType = {
  OG: {
    SUBCATEGORIES_PICTURES: typeof SUBCATEGORIES_OG_PICTURES;
    CATEGORIES_PICTURES: typeof CATEGORIES_OG_PICTURES;
  };
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_SUBCATEGORIES_ON_BLOG_CATEGORY_PAGE: StringsCompareFun;
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_CATEGORY_PAGE: DatesCompareFun;
  USE_BLOG_POSTS_NOTFOUND_WHEN_SUBCATEGORY_IS_EMPTY_INSTEAD_OF_NOT_FOUND: boolean;
  COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE: FiltersAssoc;
  DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT: Limit;
  DISPLAYED_BLOG_POSTS_PER_SUBCATEGORY_ON_BLOG_CATEGORY_PAGE_LIMIT: Limit;
  BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC: PostsCollectionAssoc;
  BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT: Limit;
  TESTING_CATEGORY: typeof TESTING_CATEGORY;
  ENABLE_DRAFTS_IN_PROD: boolean;
  SHOW_DRAFTS_BADGE: boolean;
};

const TESTING_CATEGORY = 'blog-testing-category' as const satisfies BlogCategory;

const CATEGORIES_OG_PICTURES = {
  'patch-notes-bis': ['/assets/medias/img/dev/placeholders/placeholder-59.jpeg'],
  'patch-notes': ['/assets/medias/img/dev/placeholders/placeholder-60.jpeg']
} as const satisfies Partial<Omit<BlogCategoriesOGPictures, typeof TESTING_CATEGORY>>;

const SUBCATEGORIES_OG_PICTURES = {
  'patch-notes-bis': {
    'discord-bot-bis': ['/assets/medias/img/dev/placeholders/placeholder-63.jpeg'],
    'dashboard-bis': ['/assets/medias/img/dev/placeholders/placeholder-64.jpeg']
  },
  'patch-notes': {
    'discord-bot': ['/assets/medias/img/dev/placeholders/placeholder-62.jpeg'],
    dashboard: ['/assets/medias/img/dev/placeholders/placeholder-61.jpeg']
  }
} as const satisfies Partial<Omit<BlogSubcategoriesOGPictures, typeof TESTING_CATEGORY>>;

const BlogConfig: BlogConfigType = {
  BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC: Object.fromEntries(
    Object.entries(categoriesBlogDataAssoc).map(([categoryFolder, blogDataName]) => [
      categoryFolder,
      () => import('contentlayer/generated').then((data) => data[blogDataName])
    ])
  ) as PostsCollectionAssoc,

  OG: {
    SUBCATEGORIES_PICTURES: SUBCATEGORIES_OG_PICTURES,
    CATEGORIES_PICTURES: CATEGORIES_OG_PICTURES
  },

  USE_BLOG_POSTS_NOTFOUND_WHEN_SUBCATEGORY_IS_EMPTY_INSTEAD_OF_NOT_FOUND: true,
  DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT: 5,

  DISPLAYED_BLOG_POSTS_PER_SUBCATEGORY_ON_BLOG_CATEGORY_PAGE_LIMIT: 2,
  BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT: 250,
  ENABLE_DRAFTS_IN_PROD: false,

  SHOW_DRAFTS_BADGE: true,
  TESTING_CATEGORY,

  ...BlogConfigClient
} as const;

export default BlogConfig;
