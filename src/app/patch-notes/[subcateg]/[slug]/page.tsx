import BlogPost from '@/components/blog/BlogPost';
import { adHocBlogPostsParamsRestBuilder, getBlogCategoryFromPathname, getPost } from '@/lib/blog';
import getServerSidePathnameWorkaround from '@/lib/misc/getServerSidePathname';
import BlogTaxonomy from '@/taxonomies/blog';
import { BlogCategory, BlogPostPageProps } from '@/types/Blog';
import { notFound } from 'next/navigation';

export function generateMetadata({ params }: BlogPostPageProps) {
  const categ = getBlogCategoryFromPathname(getServerSidePathnameWorkaround()) as BlogCategory;
  const subCateg = params[BlogTaxonomy.subCategory];
  const slug = params[BlogTaxonomy.slug];

  const post = getPost(categ, subCateg, slug);
  if (!post) notFound();

  return { title: post.title, description: post.metadescription };
}

export default function Page({ params }: BlogPostPageProps) {
  const params2 = adHocBlogPostsParamsRestBuilder();
  return <BlogPost {...{ params, ...params2 }} />;
}
