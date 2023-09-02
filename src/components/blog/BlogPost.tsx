import BlogPostInner from '@/components/pagesInner/blog/BlogPost';
import { getPostUnstrict } from '@/lib/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogPostPageProps, BlogSubCategoryFromUnknownCategory } from '@/types/Blog';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';

export const BlogPost: FunctionComponent<BlogPostPageProps> = ({ params }) => {
  const category = params[BlogTaxonomy.category];
  const subCategory = params[BlogTaxonomy.subCategory] as BlogSubCategoryFromUnknownCategory;
  const slug = params[BlogTaxonomy.slug];
  const lng = params[i18nTaxonomy.langFlag];

  const post = getPostUnstrict({ category, subCategory }, slug, lng);

  if (!post) notFound();
  return <BlogPostInner {...{ post, lng }} />;
};

export default BlogPost;
