import BlogPostInner from '@/components/pagesInner/blog/BlogPost';
import { getPost } from '@/lib/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import { BlogPostProps } from '@/types/Blog';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';

export const BlogPost: FunctionComponent<BlogPostProps> = ({ params, ...params2 }) => {
  const categ = params2[BlogTaxonomy.category];
  const subCateg = params[BlogTaxonomy.subCategory];
  const slug = params[BlogTaxonomy.slug];

  const post = getPost(categ, subCateg, slug);

  if (!post) notFound();
  return <BlogPostInner {...{ post }} />;
};

export default BlogPost;
