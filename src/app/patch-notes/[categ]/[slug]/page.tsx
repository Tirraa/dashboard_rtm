import BlogPost from '@/app/_components/_definitelyCoupledToServerCtx/BlogPost';
import { getPost } from '@/app/_lib/blog';
import BlogTaxonomy from '@/app/_taxonomies/blog';
import { BlogPostProps } from '@/app/_types/Blog';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';

export const generateMetadata = ({ params }: BlogPostProps) => {
  const slug = params[BlogTaxonomy.slug];
  const categ = params[BlogTaxonomy.category];

  const post = getPost(slug, categ);
  if (!post) notFound();

  return { title: post.title, description: post.description };
};

export const Page: FunctionComponent<BlogPostProps> = ({ params }) => <BlogPost {...{ params }} />;
export default Page;
