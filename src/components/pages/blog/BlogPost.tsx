import MDX from '@/components/layouts/blog/MdxComponent';
import BlogPostDate from '@/components/ui/blog/BlogPostDate';
import { getBlogPostUnstrict, isValidBlogCategoryAndSubcategoryPair } from '@/lib/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import type { BlogPostPageProps, BlogPostProps } from '@/types/Blog';
import { notFound } from 'next/navigation';
import type { FunctionComponent } from 'react';

interface BlogPostInnerProps extends BlogPostProps {}

const BlogPostInner: FunctionComponent<BlogPostInnerProps> = ({ post, lng }) => (
  <section className="mx-auto max-w-xl py-8">
    <div className="mb-8 text-center">
      <BlogPostDate post={post} lng={lng} />
      <h1>{post.title}</h1>
    </div>
    <div className="max-w-full [&>*]:break-words">
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
