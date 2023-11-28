import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import MDX from '@/components/layouts/blog/MdxComponent';
import BlogPostDate from '@/components/ui/blog/BlogPostDate';
import { getBlogPostUnstrict, isValidBlogCategoryAndSubcategoryPair } from '@/lib/blog';
import type { BlogPostPageProps, BlogPostProps, PostBase } from '@/types/Blog';
import type { Maybe } from '@rtm/shared-types/src/CustomUtilityTypes';
import { notFound } from 'next/navigation';
import type { FunctionComponent } from 'react';

interface BlogPostInnerProps extends BlogPostProps {}

const BlogPostInner: FunctionComponent<BlogPostInnerProps> = ({ post, language }) => (
  <section className="mx-12 w-auto max-w-[730px]">
    <div className="mb-4 text-center">
      <BlogPostDate post={post} language={language} />
      <h1 className="mt-2">{post.title}</h1>
    </div>
    <div className="max-w-full">
      <MDX code={post.body.code} />
    </div>
  </section>
);

export const BlogPost: FunctionComponent<BlogPostPageProps> = async ({ params }) => {
  const category = params[BlogTaxonomy.CATEGORY];
  const subcategory = params[BlogTaxonomy.SUBCATEGORY];
  const language = params[I18nTaxonomy.LANGUAGE];

  const isValidPair: boolean = await isValidBlogCategoryAndSubcategoryPair(category, subcategory, language);
  if (!isValidPair) notFound();

  const slug = params[BlogTaxonomy.SLUG];

  const post: Maybe<PostBase> = await getBlogPostUnstrict(category, subcategory, slug, language);
  if (!post) notFound();

  return <BlogPostInner post={post} language={language} />;
};

export default BlogPost;
