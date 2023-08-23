import BlogPost from '@/app/_components/_definitelyCoupledToServerCtx/BlogPost';
import getBlogPostCategoryBasedOnSlugPathname from '@/app/_lib/getBlogPostCategoryBasedOnSlugPathname';
import { getPost } from '@/app/_lib/getPost';
import useServerSidePathnameWorkaround from '@/app/_lib/useServerSidePathname';
import BlogPostProps from '@/app/_types/BlogPostProps';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';

export const generateMetadata = ({ params }: BlogPostProps) => {
  const pathname = useServerSidePathnameWorkaround();
  const categ = getBlogPostCategoryBasedOnSlugPathname(pathname);
  const post = getPost(params.slug, categ);
  if (!post) notFound();
  return { title: post.title, description: post.description };
};

export const Page: FunctionComponent<BlogPostProps> = ({ params }) => <BlogPost {...{ params }} />;
export default Page;
