import { getBlogPostPathWithoutI18nPart } from '@/lib/blog';
import { getSlicedBlogPostDescription } from '@/lib/str';
import type { BlogPostProps } from '@/types/Blog';
import Link from 'next/link';
import type { FunctionComponent } from 'react';
import BlogPostDate from './BlogPostDate';

interface BlogPostPreviewProps extends BlogPostProps {
  isNotOnBlogSubcategoryPage?: boolean;
}

export const BlogPostPreview: FunctionComponent<BlogPostPreviewProps> = ({ post, lng, isNotOnBlogSubcategoryPage }) => {
  const descriptionSnippet = post.description ? getSlicedBlogPostDescription(post.description) : getSlicedBlogPostDescription(post.metadescription);

  return (
    <article className="rounded overflow-hidden border border-2 border-neutral-100 shadow-xl transition-colors transition-transform duration-300 hover:scale-105 hover:delay-0 hover:duration-100 dark:border-muted-foreground">
      <Link href={getBlogPostPathWithoutI18nPart(post)} className="flex h-full w-full flex-col p-4">
        {isNotOnBlogSubcategoryPage ? <h3>{post.title}</h3> : <h2 className="is-h3">{post.title}</h2>}
        <BlogPostDate {...{ post, lng }} />
        <div className="break-words text-sm [&>*:last-child]:mb-0 [&>*]:mb-3">{descriptionSnippet}</div>
      </Link>
    </article>
  );
};

export default BlogPostPreview;
