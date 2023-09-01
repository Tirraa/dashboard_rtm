import BlogPostInner from '@/components/pagesInner/blog/BlogPost';
import { getPost } from '@/lib/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogPostPageProps, BlogSubCategory } from '@/types/Blog';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';

export const BlogPost: FunctionComponent<BlogPostPageProps> = ({ params }) => {
  const category = params[BlogTaxonomy.category];
  const subCategory = params[BlogTaxonomy.subCategory] as BlogSubCategory<typeof category>;
  const slug = params[BlogTaxonomy.slug];
  const lng = params[i18nTaxonomy.langFlag];

  const post = getPost({ category, subCategory }, slug, lng);

  if (!post) notFound();
  return <BlogPostInner {...{ post, lng }} />;
};

export default BlogPost;
