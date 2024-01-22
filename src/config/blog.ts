import type { StringsCompareFun } from '@rtm/shared-types/StringManipulations';
import type { DatesCompareFun } from '@rtm/shared-types/DateManipulations';
import type { PostsCollectionAssoc, BlogCategory } from '@/types/Blog';

import { categoriesBlogDataAssoc } from '##/config/contentlayer/blog/documentTypes';
import { compareAlphabetically } from '@/lib/str';
import compareDesc from 'date-fns/compareDesc';

export type TBlogConfig = {
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_SUBCATEGORIES_ON_BLOG_CATEGORY_PAGE: StringsCompareFun;
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE: DatesCompareFun;
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_CATEGORY_PAGE: DatesCompareFun;
  USE_BLOG_POSTS_NOTFOUND_WHEN_SUBCATEGORY_IS_EMPTY_INSTEAD_OF_NOT_FOUND: boolean;
  DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT: number;
  DISPLAYED_BLOG_POSTS_PER_SUBCATEGORY_ON_BLOG_CATEGORY_PAGE_LIMIT: number;
  BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC: PostsCollectionAssoc;
  BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT: number;
  TESTING_CATEGORY: typeof TESTING_CATEGORY;
  ENABLE_DRAFTS_IN_PROD: boolean;
};

const TESTING_CATEGORY = 'blog-testing-category' as const satisfies BlogCategory;
const BlogConfig: TBlogConfig = {
  BLOG_CATEGORIES_ALL_POSTS_CONSTS_ASSOC: Object.fromEntries(
    Object.entries(categoriesBlogDataAssoc).map(([categoryFolder, blogDataName]) => [
      categoryFolder,
      () => import('contentlayer/generated').then((data) => data[blogDataName])
    ])
  ) as PostsCollectionAssoc,
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_SUBCATEGORIES_ON_BLOG_CATEGORY_PAGE: compareAlphabetically,
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE: compareDesc,
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_CATEGORY_PAGE: compareDesc,
  USE_BLOG_POSTS_NOTFOUND_WHEN_SUBCATEGORY_IS_EMPTY_INSTEAD_OF_NOT_FOUND: true,
  DISPLAYED_BLOG_POSTS_ON_SUBCATEGORY_RELATED_PAGE_PAGINATION_LIMIT: 5,

  DISPLAYED_BLOG_POSTS_PER_SUBCATEGORY_ON_BLOG_CATEGORY_PAGE_LIMIT: 2,
  BLOG_POST_PREVIEW_DESCRIPTION_CHARACTERS_LIMIT: 250,
  ENABLE_DRAFTS_IN_PROD: false,

  TESTING_CATEGORY
} as const;

export default BlogConfig;
