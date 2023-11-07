import { getBlogPostFormattedDate } from '@/lib/blog';
import { cn } from '@/lib/tailwind';
import type { BlogPostProps } from '@/types/Blog';
import type { WithClassname } from '@/types/Next';
import type { FunctionComponent } from 'react';

interface BlogPostDateProps extends BlogPostProps, Partial<WithClassname> {}

export const BlogPostDate: FunctionComponent<BlogPostDateProps> = ({ post, lng, className: classNameValue }) => (
  <time dateTime={post.date} className={cn('text-xs', classNameValue)}>
    {getBlogPostFormattedDate(lng, post)}
  </time>
);

export default BlogPostDate;
