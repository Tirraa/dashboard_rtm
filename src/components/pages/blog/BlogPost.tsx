import type { BlogPostPageProps, BlogPostProps, TBlogPost } from '@/types/Blog';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { WithClassname } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import { isValidBlogCategoryAndSubcategoryPair, getBlogPostUnstrict } from '@/lib/blog/api';
import BlogPostDate from '@/components/ui/blog/BlogPostDate';
import MDX from '@/components/layouts/blog/MdxComponent';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/tailwind';

interface BlogPostInnerProps extends BlogPostProps {}
interface _BlogPostPageProps extends BlogPostPageProps, Partial<WithClassname> {}

const BlogPostInner: FunctionComponent<BlogPostInnerProps> = ({ className: classNameValue, language, post }) => (
  <section className={cn('mx-12 w-auto max-w-[730px]', classNameValue)}>
    <div className="mb-4 text-center">
      <BlogPostDate language={language} post={post} />
      <h1 className="mt-2">{post.title}</h1>
    </div>
    <div className="max-w-full">
      <MDX code={post.body.code} />
    </div>
  </section>
);

const BlogPost: FunctionComponent<_BlogPostPageProps> = async ({ className: classNameValue, params }) => {
  const category = params[BlogTaxonomy.CATEGORY];
  const subcategory = params[BlogTaxonomy.SUBCATEGORY];
  const language = params[I18nTaxonomy.LANGUAGE];

  const isValidPair: boolean = await isValidBlogCategoryAndSubcategoryPair(category, subcategory, language);
  if (!isValidPair) notFound();

  const slug = params[BlogTaxonomy.SLUG];

  const post: MaybeNull<TBlogPost> = await getBlogPostUnstrict(category, subcategory, slug, language);
  if (!post) notFound();

  return <BlogPostInner className={classNameValue} language={language} post={post} />;
};

export default BlogPost;
