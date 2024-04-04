/* v8 ignore start */
// Stryker disable all

import type { I18nVocabTarget, LanguageFlag } from '@rtm/shared-types/I18n';
import type { BlogPostPreviewComponentWithMetadatas } from '@/types/Blog';
import type { Score } from '@rtm/shared-types/Numbers';

import { compareAlphabeticallyDesc, compareAlphabeticallyAsc } from '@/lib/str';
import { compareDesc } from 'date-fns/compareDesc';
import { compareAsc } from 'date-fns/compareAsc';

import type { BlogConfigType } from './server';

const COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE: FiltersAssoc = [
  {
    score: (post1: P, post2: P) => compareDesc(new Date(post1.date), new Date(post2.date)),
    i18nTitle: 'filters.date-desc'
  },
  {
    score: (post1: P, post2: P) => compareAsc(new Date(post1.date), new Date(post2.date)),
    i18nTitle: 'filters.date-asc'
  },
  {
    score: (post1: P, post2: P) => compareAlphabeticallyAsc(post1.title, post2.title, post1.language as LanguageFlag),
    i18nTitle: 'filters.alphabet-asc'
  },
  {
    score: (post1: P, post2: P) => compareAlphabeticallyDesc(post1.title, post2.title, post1.language as LanguageFlag),
    i18nTitle: 'filters.alphabet-desc'
  }
];

const BlogConfigClient: BlogConfigClientType = {
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_SUBCATEGORIES_ON_BLOG_CATEGORY_PAGE: compareAlphabeticallyAsc,
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_CATEGORY_PAGE: compareDesc,
  COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE
} as const;

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const MAX_FILTER_INDEX = BlogConfigClient.COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE.length - 1;

export default BlogConfigClient;

type P = BlogPostPreviewComponentWithMetadatas;

type BlogConfigClientType = Pick<
  BlogConfigType,
  | 'DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_SUBCATEGORIES_ON_BLOG_CATEGORY_PAGE'
  | 'DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_CATEGORY_PAGE'
  | 'COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE'
>;

type Filter = {
  score: (post1: P, post2: P) => Score;
  i18nTitle: I18nVocabTarget;
};

export type FiltersAssoc = Filter[];

// Stryker restore all
/* v8 ignore stop */
