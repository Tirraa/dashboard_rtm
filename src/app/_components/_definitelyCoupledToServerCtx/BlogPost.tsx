import doGenerateBlogStaticParams from '@/app/_lib/doGenerateBlogStaticParams';
import getCurrentBlogDir from '@/app/_lib/getCurrentBlogDir';
import { getPost } from '@/app/_lib/getPost';
import BlogTaxonomy from '@/app/_taxonomies/blog';
import BlogPostProps from '@/app/_types/BlogPostProps';
import { format, parseISO } from 'date-fns';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';

export const generateStaticParams = doGenerateBlogStaticParams;

export const generateMetadata = ({ params }: BlogPostProps) => {
  const post = getPost(params[BlogTaxonomy.slug], getCurrentBlogDir());
  if (!post) notFound();
  return { title: post.title };
};

export const BlogPost: FunctionComponent<BlogPostProps> = ({ params }) => {
  const post = getPost(params[BlogTaxonomy.slug], getCurrentBlogDir());
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
        <h1 className="text-3xl font-bold">{post.title}</h1>
      </div>
      <div className="[&>*]:mb-3 [&>*:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </article>
  );
};

export default BlogPost;
