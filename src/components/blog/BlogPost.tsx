import BlogPostInner from '@/components/pagesInner/blog/BlogPost';
import { getPost } from '@/lib/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogPostPageProps } from '@/types/Blog';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';

export const BlogPost: FunctionComponent<BlogPostPageProps> = ({ params }) => {
  const categ = params[BlogTaxonomy.category];
  const subCateg = params[BlogTaxonomy.subCategory];
  const slug = params[BlogTaxonomy.slug];
  const lang = params[i18nTaxonomy.langFlag];

  const post = getPost(categ, subCateg, slug, lang);

  if (!post) notFound();
  return <BlogPostInner {...{ post }} />;
};

export default BlogPost;
