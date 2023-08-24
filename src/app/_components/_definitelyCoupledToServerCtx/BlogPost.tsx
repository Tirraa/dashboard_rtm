import { getPost } from '@/app/_lib/blog';
import BlogTaxonomy from '@/app/_taxonomies/blog';
import { BlogPostProps } from '@/app/_types/Blog';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';
import BlogPostInner from '../PagesInner/BlogPost';

export const BlogPost: FunctionComponent<BlogPostProps> = ({ params }) => {
  const categ = params[BlogTaxonomy.category];
  const post = getPost(params[BlogTaxonomy.slug], categ);

  if (!post) notFound();
  return <BlogPostInner {...{ post }} />;
};

export default BlogPost;
