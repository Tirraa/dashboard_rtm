import BlogPost from '@/components/blog/BlogPost';
import { adHocBlogPostsParamsRestBuilder, getBlogCategoryFromPathname, getPost } from '@/lib/blog';
import useServerSidePathnameWorkaround from '@/lib/misc/useServerSidePathname';
import BlogTaxonomy from '@/taxonomies/blog';
import { BlogCategory, BlogPostProps } from '@/types/Blog';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';

export const generateMetadata = ({ params }: BlogPostProps) => {
  const categ = getBlogCategoryFromPathname(useServerSidePathnameWorkaround()) as BlogCategory;
  const subCateg = params[BlogTaxonomy.subCategory];
  const slug = params[BlogTaxonomy.slug];

  const post = getPost(categ, subCateg, slug);
  if (!post) notFound();

  return { title: post.title, description: post.description };
};

export const Page: FunctionComponent<BlogPostProps> = ({ params }) => {
  const params2 = adHocBlogPostsParamsRestBuilder();
  return <BlogPost {...{ params, ...params2 }} />;
};

export default Page;
