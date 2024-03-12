import type { BlogPostPageProps, BlogPostProps, BlogPostType } from '@/types/Blog';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { WithClassname } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import { isValidBlogCategoryAndSubcategoryPair, getBlogPostUnstrict } from '@/lib/blog/api';
import BlogPostTocDesktop from '@/components/ui/blog/BlogPostTocDesktop';
import BlogPostTocMobile from '@/components/ui/blog/BlogPostTocMobile';
import tagsGenerator from '@/components/ui/blog/tagsGenerator';
import BlogPostDate from '@/components/ui/blog/BlogPostDate';
import MDX from '@/components/layouts/blog/MdxComponent';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/tailwind';
import dynamic from 'next/dynamic';

interface BlogPostInnerProps extends BlogPostProps {}
interface _BlogPostPageProps extends BlogPostPageProps, Partial<WithClassname> {}

const GoToTopButton = dynamic(() => import('@/components/ui/misc/goToTopButton'), { ssr: false });

const BlogPostInner: FunctionComponent<BlogPostInnerProps> = async ({ className: classNameValue, language, post }) => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const hasTags = post.tags.length > 0;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const showToC = post.headings.length > 1;

  return (
    <>
      <section className={cn('mx-12 w-auto max-w-[730px] lg:w-[45vw]', classNameValue)}>
        <header className="mb-4 p-2 text-center">
          <h1>{post.title}</h1>
          <BlogPostDate language={language} post={post} />
          {hasTags && (
            <div className="mt-1 flex flex-wrap justify-center gap-2 md:mx-auto md:w-fit md:justify-normal">{await tagsGenerator(post)}</div>
          )}
        </header>
        <div className="flex max-w-full flex-col lg:flex-row">
          {showToC && <BlogPostTocMobile headings={post.headings} />}
          <MDX code={post.body.code} />
          {showToC && <BlogPostTocDesktop headings={post.headings} />}
        </div>
      </section>
      <GoToTopButton />
    </>
  );
};

const BlogPost: FunctionComponent<_BlogPostPageProps> = async ({ className: classNameValue, params }) => {
  const [category, subcategory, language] = [params[BlogTaxonomy.CATEGORY], params[BlogTaxonomy.SUBCATEGORY], params[I18nTaxonomy.LANGUAGE]];

  const isValidPair: boolean = await isValidBlogCategoryAndSubcategoryPair(category, subcategory, language);
  if (!isValidPair) notFound();

  const slug = params[BlogTaxonomy.SLUG];

  const post: MaybeNull<BlogPostType> = await getBlogPostUnstrict(category, subcategory, slug, language);
  if (!post) notFound();

  return <BlogPostInner className={classNameValue} language={language} post={post} />;
};

export default BlogPost;
