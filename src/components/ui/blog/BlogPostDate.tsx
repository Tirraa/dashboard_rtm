import { getBlogPostFormattedDate } from '@/lib/blog';
import { cn } from '@/lib/tailwind';
import type { BlogPostProps } from '@/types/Blog';
import type { WithClassname } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

interface BlogPostDateProps extends BlogPostProps, Partial<WithClassname> {}

const BlogPostDate: FunctionComponent<BlogPostDateProps> = ({ post, language, className: classNameValue }) => (
  <time dateTime={post.date} className={cn('text-xs', classNameValue)}>
    {getBlogPostFormattedDate(language, post)}
  </time>
);

export default BlogPostDate;
