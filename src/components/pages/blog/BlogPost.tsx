import BlogTaxonomy from '##/config/taxonomies/blog';
import i18nTaxonomy from '##/config/taxonomies/i18n';
import MDX from '@/components/layouts/blog/MdxComponent';
import BlogPostDate from '@/components/ui/blog/BlogPostDate';
import { getBlogPostUnstrict, isValidBlogCategoryAndSubcategoryPair } from '@/lib/blog';
import type { BlogPostPageProps, BlogPostProps } from '@/types/Blog';
import { notFound } from 'next/navigation';
import type { FunctionComponent } from 'react';

interface BlogPostInnerProps extends BlogPostProps {}

const BlogPostInner: FunctionComponent<BlogPostInnerProps> = ({ post, lng }) => (
  <section className="mx-12 w-auto max-w-[730px]">
    <div className="mb-4 text-center">
      <BlogPostDate post={post} lng={lng} />
      <h1 className="mt-2">{post.title}</h1>
    </div>
    <div className="max-w-full">
      <MDX code={post.body.code} />
    </div>
  </section>
);

export const BlogPost: FunctionComponent<BlogPostPageProps> = ({ params }) => {
  const category = params[BlogTaxonomy.CATEGORY];
  const subcategory = params[BlogTaxonomy.SUBCATEGORY];

  if (!isValidBlogCategoryAndSubcategoryPair(category, subcategory)) notFound();

  const slug = params[BlogTaxonomy.SLUG];
  const lng = params[i18nTaxonomy.LANG_FLAG];

  const post = getBlogPostUnstrict({ category, subcategory }, slug, lng);
  if (!post) notFound();

  return <BlogPostInner post={post} lng={lng} />;
};

export default BlogPost;
