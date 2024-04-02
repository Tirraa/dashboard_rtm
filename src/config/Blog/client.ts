import { compareDesc } from 'date-fns/compareDesc';
import { compareAlphabetically } from '@/lib/str';
import { compareAsc } from 'date-fns/compareAsc';

import type { BlogConfigType } from './server';

type BlogConfigClientType = Pick<
  BlogConfigType,
  | 'DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_SUBCATEGORIES_ON_BLOG_CATEGORY_PAGE'
  | 'DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_CATEGORY_PAGE'
  | 'COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE'
>;

const COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE = [
  {
    i18nTitle: 'filters.date-asc',
    fun: compareAsc
  },
  {
    i18nTitle: 'filters.date-desc',
    fun: compareDesc
  }
] as const;

const BlogConfigClient: BlogConfigClientType = {
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_SUBCATEGORIES_ON_BLOG_CATEGORY_PAGE: compareAlphabetically,
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_CATEGORY_PAGE: compareDesc,
  COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE
} as const;

export default BlogConfigClient;
