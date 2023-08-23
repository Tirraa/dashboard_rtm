import { Post } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { getSlicedBlogPostDescription } from '../_lib/getSlicedBlogPostDescription';

interface BlogPostPeviewProps {
  post: Post;
}

// {ToDo} Attempt to create even worse graphically designed Blog Posts Previews.
export const BlogPostPeview: FunctionComponent<BlogPostPeviewProps> = ({ post }) => (
  <div className="mb-8">
    <h2 className="mb-1 text-xl">
      <Link href={post.url} className="text-blue-700 hover:text-blue-900 dark:text-blue-400">
        {post.title}
      </Link>
    </h2>
    <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
      {format(parseISO(post.date), 'LLLL d, yyyy')}
    </time>
    <div
      className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0 break-words"
      dangerouslySetInnerHTML={{ __html: getSlicedBlogPostDescription(post.description) }}
    />
  </div>
);

export default BlogPostPeview;
