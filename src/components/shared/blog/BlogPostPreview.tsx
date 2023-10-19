import { getBlogPostPathWithoutI18nPart } from '@/lib/blog';
import { getSlicedBlogPostDescription } from '@/lib/str';
import { BlogPostProps } from '@/types/Blog';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import BlogPostDate from './BlogPostDate';

interface BlogPostPeviewProps extends BlogPostProps {}

export const BlogPostPeview: FunctionComponent<BlogPostPeviewProps> = ({ post, lng }) => {
  const descriptionSnippet = post.description ? getSlicedBlogPostDescription(post.description) : getSlicedBlogPostDescription(post.metadescription);

  return (
    <div className="mb-8">
      <h2 className="mb-1">
        <Link href={getBlogPostPathWithoutI18nPart(post)} className="text-blue-700 hover:text-blue-900 dark:text-blue-400">
          {post.title}
        </Link>
      </h2>
      <BlogPostDate {...{ post, lng }} />
      <div className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0 break-words" dangerouslySetInnerHTML={{ __html: descriptionSnippet }} />
    </div>
  );
};

export default BlogPostPeview;
