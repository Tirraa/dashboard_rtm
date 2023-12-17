import type { WithClassname } from '@rtm/shared-types/Next';
import type { BlogPostProps } from '@/types/Blog';
import type { FunctionComponent } from 'react';

import { getBlogPostFormattedDate } from '@/lib/blog/api';
import { cn } from '@/lib/tailwind';

interface BlogPostDateProps extends BlogPostProps, Partial<WithClassname> {}

const BlogPostDate: FunctionComponent<BlogPostDateProps> = ({ className: classNameValue, language, post }) => (
  <time className={cn('text-xs', classNameValue)} dateTime={post.date}>
    {getBlogPostFormattedDate(language, post.date)}
  </time>
);

export default BlogPostDate;
