import { compareDesc } from 'date-fns/compareDesc';

import type { BlogConfigType } from './server';

type BlogConfigClientType = Pick<BlogConfigType, 'DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE'>;

const BlogConfigClient: BlogConfigClientType = {
  DEFAULT_COMPARE_FUNCTION_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE: compareDesc
} as const;

export default BlogConfigClient;
