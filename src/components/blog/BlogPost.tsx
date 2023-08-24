import BlogPostInner from '@/components/pagesInner/blog/BlogPost';
import { getPost } from '@/lib/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import { BlogPostProps } from '@/types/Blog';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';

export const BlogPost: FunctionComponent<BlogPostProps> = ({ params }) => {
  const subCateg = params[BlogTaxonomy.subCategory];
  const post = getPost(params[BlogTaxonomy.slug], subCateg);

  if (!post) notFound();
  return <BlogPostInner {...{ post }} />;
};

export default BlogPost;
