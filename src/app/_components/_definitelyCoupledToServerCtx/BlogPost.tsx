import { getBlogPostCategoryBasedOnSlugPathname } from '@/app/_lib/blogPostCategoryGetters';
import { getPost } from '@/app/_lib/getPost';
import useServerSidePathnameWorkaround from '@/app/_lib/useServerSidePathname';
import BlogTaxonomy from '@/app/_taxonomies/blog';
import { BlogPostProps } from '@/app/_types/BlogProps';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';
import BlogPostInner from '../PagesInner/BlogPost';

export const BlogPost: FunctionComponent<BlogPostProps> = ({ params }) => {
  const currentPathname = useServerSidePathnameWorkaround();
  const categ = getBlogPostCategoryBasedOnSlugPathname(currentPathname);

  const post = getPost(params[BlogTaxonomy.slug], categ);
  if (!post) notFound();

  return <BlogPostInner {...{ post }} />;
};

export default BlogPost;
