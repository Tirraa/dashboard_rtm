import type { StringsCompareFun } from '@rtm/shared-types/StringManipulations';
import type { DatesCompareFun } from '@rtm/shared-types/DateManipulations';
import type { I18nVocabTarget } from '@rtm/shared-types/I18n';

import { compareAlphabeticallyDesc, compareAlphabeticallyAsc } from '@/lib/str';
import { compareDesc } from 'date-fns/compareDesc';
import { compareAsc } from 'date-fns/compareAsc';

import type { BlogConfigType } from './server';

type BlogConfigClientType = Pick<
  BlogConfigType,
  | 'DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_SUBCATEGORIES_ON_BLOG_CATEGORY_PAGE'
  | 'DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_CATEGORY_PAGE'
  | 'COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE'
>;

type FilterFun = StringsCompareFun | DatesCompareFun;

type Filter = {
  i18nTitle: I18nVocabTarget;
  fun: FilterFun;
};

export const COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE = [
  {
    i18nTitle: 'filters.date-desc',
    fun: compareDesc
  },
  {
    i18nTitle: 'filters.date-asc',
    fun: compareAsc
  },
  {
    i18nTitle: 'filters.alphabet-asc',
    fun: compareAlphabeticallyAsc
  },
  {
    i18nTitle: 'filters.alphabet-desc',
    fun: compareAlphabeticallyDesc
  }
] as const satisfies Filter[];

const BlogConfigClient: BlogConfigClientType = {
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_SUBCATEGORIES_ON_BLOG_CATEGORY_PAGE: compareAlphabeticallyAsc,
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_CATEGORY_PAGE: compareDesc,
  COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE
} as const;

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const MAX_FILTER_INDEX = BlogConfigClient.COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE.length - 1;

export default BlogConfigClient;
