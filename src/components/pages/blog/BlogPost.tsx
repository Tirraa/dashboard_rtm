import MDX from '@/components/layouts/blog/MdxComponent';
import BlogPostDate from '@/components/shared/ui/blog/BlogPostDate';
import { getPostUnstrict, isValidCategoryAndSubcategoryPair } from '@/lib/blog';
import BlogTaxonomy from '@/taxonomies/blog';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogPostPageProps, BlogPostProps } from '@/types/Blog';
import { notFound } from 'next/navigation';
import { FunctionComponent } from 'react';

interface BlogPostInnerProps extends BlogPostProps {}

const BlogPostInner: FunctionComponent<BlogPostInnerProps> = ({ post, lng }) => {
  return (
    <section className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <BlogPostDate {...{ post, lng }} />
        <h1>{post.title}</h1>
      </div>
      <div className="max-w-full [&>*]:break-words">
        <MDX code={post.body.code} />
      </div>
    </section>
  );
};

export const BlogPost: FunctionComponent<BlogPostPageProps> = ({ params }) => {
  const category = params[BlogTaxonomy.CATEGORY];
  const subCategory = params[BlogTaxonomy.SUBCATEGORY];

  if (!isValidCategoryAndSubcategoryPair(category, subCategory)) notFound();

  const slug = params[BlogTaxonomy.SLUG];
  const lng = params[i18nTaxonomy.LANG_FLAG];

  const post = getPostUnstrict({ category, subCategory }, slug, lng);
  if (!post) notFound();

  return <BlogPostInner {...{ post, lng }} />;
};

export default BlogPost;
