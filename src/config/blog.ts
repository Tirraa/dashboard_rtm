import { categoriesBlogDataAssoc } from '##/config/blog/documentTypes';
import { compareAlphabetically } from '@/lib/str';
import type { PostsCollectionAssoc } from '@/types/Blog';
import type { DatesCompareFun } from '@rtm/shared-types/DateManipulations';
import type { StringsCompareFun } from '@rtm/shared-types/StringManipulations';
import compareDesc from 'date-fns/compareDesc';

export type BlogArchitecture = {
  'patch-notes': 'dashboard' | 'discord-bot';
  'patch-notes-bis': 'dashboard-bis' | 'discord-bot-bis';
};

type TBlogConfig = {
  DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT: number;
  DISPLAYED_BLOG_POSTS_PER_SUBCATEGORY_ON_BLOG_CATEGORY_PAGE_LIMIT: number;
  BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT: number;
  USE_BLOG_POSTS_NOTFOUND_WHEN_SUBCATEGORY_IS_EMPTY_INSTEAD_OF_NOT_FOUND: boolean;
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_SUBCATEGORIES_ON_BLOG_CATEGORY_PAGE: StringsCompareFun;
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_CATEGORY_PAGE: DatesCompareFun;
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE: DatesCompareFun;
  BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC: PostsCollectionAssoc;
};

const BlogConfig: TBlogConfig = {
  DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT: 5,
  DISPLAYED_BLOG_POSTS_PER_SUBCATEGORY_ON_BLOG_CATEGORY_PAGE_LIMIT: 2,
  BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT: 250,
  USE_BLOG_POSTS_NOTFOUND_WHEN_SUBCATEGORY_IS_EMPTY_INSTEAD_OF_NOT_FOUND: true,

  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_SUBCATEGORIES_ON_BLOG_CATEGORY_PAGE: compareAlphabetically,
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_CATEGORY_PAGE: compareDesc,
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE: compareDesc,

  BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC: Object.fromEntries(
    Object.entries(categoriesBlogDataAssoc).map(([categoryFolder, blogDataName]) => [
      categoryFolder,
      () => import('contentlayer/generated').then((data) => data[blogDataName])
    ])
  ) as PostsCollectionAssoc
} as const;

export default BlogConfig;
