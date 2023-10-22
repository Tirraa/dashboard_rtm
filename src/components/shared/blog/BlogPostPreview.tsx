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
    <article className="transition-colors transition-transform border duration-300 border-neutral-200 dark:border-slate-500 border-2 rounded overflow-hidden shadow-xl hover:scale-105 hover:delay-0 hover:duration-100">
      <Link href={getBlogPostPathWithoutI18nPart(post)} className="p-4 flex flex-col w-full h-full">
        <h3>{post.title}</h3>
        <BlogPostDate {...{ post, lng }} />
        <div className="text-sm [&>*]:mb-3 [&>*:last-child]:mb-0 break-words">{descriptionSnippet}</div>
      </Link>
    </article>
  );
};

export default BlogPostPeview;
