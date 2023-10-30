import { getBlogPostFormattedDate } from '@/lib/blog';
import { BlogPostProps } from '@/types/Blog';
import { FunctionComponent } from 'react';

interface BlogPostDateProps extends BlogPostProps {}

export const BlogPostDate: FunctionComponent<BlogPostDateProps> = ({ post, lng }) => (
  <time dateTime={post.date} className="mb-1 text-xs opacity-90">
    {getBlogPostFormattedDate(lng, post)}
  </time>
);

export default BlogPostDate;
