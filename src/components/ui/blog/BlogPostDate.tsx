/* v8 ignore start */
// Stryker disable all

import type { WithClassname } from '@rtm/shared-types/Next';
import type { BlogPostProps } from '@/types/Blog';
import type { FunctionComponent } from 'react';

import { getBlogPostFormattedDate } from '@/lib/blog/api';
import { cn } from '@/lib/tailwind';

interface BlogPostDateProps extends BlogPostProps, Partial<WithClassname> {
  suffix?: string;
}

const BlogPostDate: FunctionComponent<BlogPostDateProps> = ({ className: classNameValue, language, suffix, post }) => (
  <time className={cn('text-xs', classNameValue)} dateTime={post.date}>
    {getBlogPostFormattedDate(language, post.date) + (suffix ? suffix : '')}
  </time>
);

export default BlogPostDate;

// Stryker restore all
/* v8 ignore stop */
