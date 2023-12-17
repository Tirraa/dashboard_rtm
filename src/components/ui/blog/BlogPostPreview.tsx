import type { BlogPostProps } from '@/types/Blog';
import type { FunctionComponent } from 'react';

import { getBlogPostPathWithoutI18nPart, getSlicedBlogPostDescription } from '@/lib/blog/api';
import Link from 'next/link';

import { CardDescription, CardContent, CardHeader, CardTitle, Card } from '../Card';
import BlogPostDate from './BlogPostDate';

interface BlogPostPreviewProps extends BlogPostProps {
  isNotOnBlogSubcategoryPage?: boolean;
}

const BlogPostPreview: FunctionComponent<BlogPostPreviewProps> = ({ isNotOnBlogSubcategoryPage, language, post }) => {
  const descriptionSnippet = post.description ? getSlicedBlogPostDescription(post.description) : getSlicedBlogPostDescription(post.metadescription);

  return (
    <article>
      <Link
        className="flex h-full w-full flex-col transition-transform duration-300 hover:delay-0 hover:duration-100 focus:delay-0 focus:duration-100 dark:hover:brightness-125 dark:focus:brightness-125 lg:hover:scale-105 lg:focus:scale-105"
        href={getBlogPostPathWithoutI18nPart(post)}
      >
        <Card className="overflow-hidden rounded shadow-lg transition-[box-shadow] duration-300 hover:shadow-xl focus:shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle titleType={isNotOnBlogSubcategoryPage ? 'h3' : 'h2'} className="is-h3">
              {post.title}
            </CardTitle>
            <CardDescription>
              <BlogPostDate className="bg-secondary p-1 text-black dark:text-white" language={language} post={post} />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="break-word text-sm [&>*:last-child]:mb-0 [&>*]:mb-3">{descriptionSnippet}</div>
          </CardContent>
        </Card>
      </Link>
    </article>
  );
};

export default BlogPostPreview;
