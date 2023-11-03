import { getBlogPostFormattedDate } from '@/lib/blog';
import { cn } from '@/lib/tailwind';
import type { BlogPostProps } from '@/types/Blog';
import type { WithClassname } from '@/types/Next';
import type { FunctionComponent } from 'react';

interface BlogPostDateProps extends BlogPostProps, Partial<WithClassname> {}

export const BlogPostDate: FunctionComponent<BlogPostDateProps> = ({ post, lng, className: classNameValue }) => {
  const className = classNameValue ?? '';
  return (
    <time dateTime={post.date} className={cn('mb-1 rounded-md text-xs', className)}>
      {getBlogPostFormattedDate(lng, post)}
    </time>
  );
};

export default BlogPostDate;
