import BlogPostInner from '@/components/pagesInner/blog/BlogPost';
import { getPost } from '@/lib/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogPostProps } from '@/types/Blog';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';

export const BlogPost: FunctionComponent<BlogPostProps> = ({ params, ...params2 }) => {
  const categ = params2[BlogTaxonomy.category];
  const subCateg = params[BlogTaxonomy.subCategory];
  const slug = params[BlogTaxonomy.slug];

  const post = getPost(categ, subCateg, slug, params[i18nTaxonomy.langFlag]);

  if (!post) notFound();
  return <BlogPostInner {...{ post }} />;
};

export default BlogPost;
