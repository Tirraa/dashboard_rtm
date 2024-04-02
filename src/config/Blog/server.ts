import type { StringsCompareFun } from '@rtm/shared-types/StringManipulations';
import type { DatesCompareFun } from '@rtm/shared-types/DateManipulations';
import type { PostsCollectionAssoc, BlogCategory } from '@/types/Blog';
import type { I18nVocabTarget } from '@rtm/shared-types/I18n';
import type { Limit } from '@rtm/shared-types/Numbers';

import { categoriesBlogDataAssoc } from '##/config/contentlayer/blog/documentTypes';

import BlogConfigClient from './client';

type FilterFun = DatesCompareFun;

type Filter = {
  i18nTitle: I18nVocabTarget;
  fun: FilterFun;
};

export type BlogConfigType = {
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_SUBCATEGORIES_ON_BLOG_CATEGORY_PAGE: StringsCompareFun;
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_CATEGORY_PAGE: DatesCompareFun;
  COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE: readonly Filter[];
  USE_BLOG_POSTS_NOTFOUND_WHEN_SUBCATEGORY_IS_EMPTY_INSTEAD_OF_NOT_FOUND: boolean;
  DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT: Limit;
  DISPLAYED_BLOG_POSTS_PER_SUBCATEGORY_ON_BLOG_CATEGORY_PAGE_LIMIT: Limit;
  BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC: PostsCollectionAssoc;
  BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT: Limit;
  TESTING_CATEGORY: typeof TESTING_CATEGORY;
  ENABLE_DRAFTS_IN_PROD: boolean;
  SHOW_DRAFTS_BADGE: boolean;
};

const TESTING_CATEGORY = 'blog-testing-category' as const satisfies BlogCategory;

const BlogConfig: BlogConfigType = {
  BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC: Object.fromEntries(
    Object.entries(categoriesBlogDataAssoc).map(([categoryFolder, blogDataName]) => [
      categoryFolder,
      () => import('contentlayer/generated').then((data) => data[blogDataName])
    ])
  ) as PostsCollectionAssoc,
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
