import { getBlogPostCategoryBasedOnSlugPathname } from '@/app/_lib/blogPostCategoryGetters';
import { getPost } from '@/app/_lib/getPost';
import useServerSidePathnameWorkaround from '@/app/_lib/useServerSidePathname';
import BlogTaxonomy from '@/app/_taxonomies/blog';
import BlogPostProps from '@/app/_types/BlogPostProps';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';
import PostCard from '../PostCard';

export const BlogPost: FunctionComponent<BlogPostProps> = ({ params }) => {
  const pathname = useServerSidePathnameWorkaround();
  const categ = getBlogPostCategoryBasedOnSlugPathname(pathname);

  const post = getPost(params[BlogTaxonomy.slug], categ);
  if (!post) notFound();

  return <PostCard {...{ post }} />;
};

export default BlogPost;
