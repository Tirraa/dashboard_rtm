import { getBlogPostPathWithoutI18nPart } from '@/lib/blog';
import { getSlicedBlogPostDescription } from '@/lib/str';
import type { BlogPostProps } from '@/types/Blog';
import Link from 'next/link';
import type { FunctionComponent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../Card';
import BlogPostDate from './BlogPostDate';

interface BlogPostPreviewProps extends BlogPostProps {
  isNotOnBlogSubcategoryPage?: boolean;
}

export const BlogPostPreview: FunctionComponent<BlogPostPreviewProps> = ({ post, lng, isNotOnBlogSubcategoryPage }) => {
  const descriptionSnippet = post.description ? getSlicedBlogPostDescription(post.description) : getSlicedBlogPostDescription(post.metadescription);

  return (
    <article>
      <Card className="overflow-hidden rounded shadow-lg transition-transform duration-300 hover:scale-105 hover:delay-0 hover:duration-100">
        <Link href={getBlogPostPathWithoutI18nPart(post)} className="flex h-full w-full flex-col">
          <CardHeader className="pb-2">
            <CardTitle titleType={isNotOnBlogSubcategoryPage ? 'h3' : 'h2'} className="is-h3">
              {post.title}
            </CardTitle>
            <CardDescription>
              <BlogPostDate {...{ post, lng }} className="bg-secondary p-1 text-black dark:text-white" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="break-words text-sm [&>*:last-child]:mb-0 [&>*]:mb-3">{descriptionSnippet}</div>
          </CardContent>
        </Link>
      </Card>
    </article>
  );
};

export default BlogPostPreview;
