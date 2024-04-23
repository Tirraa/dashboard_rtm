/* v8 ignore start */
// Stryker disable all

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { BlogPostPageProps, BlogPostType } from '@/types/Blog';

import { getBlogPostMetadatas, getBlogStaticParams, blogPostGuard } from '@/lib/blog/staticGeneration';
import documentTypeInlineFilter from '@/lib/pagefind/builders/documentTypeInlineFilter';
import BlogPostCrumb from '@/components/ui/breadcrumbs/custom/BlogPostCrumb';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import { setStaticParamsLocale } from 'next-international/server';
import BlogPost from '@/components/pages/blog/BlogPost';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getBlogPostUnstrict } from '@/lib/blog/api';
import ROUTES_ROOTS from '##/config/routes';
import { countCharacter } from '@/lib/str';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: BlogPostPageProps) {
  await blogPostGuard({ params });
  const blogPostMetadatas = await getBlogPostMetadatas({ params });

  return blogPostMetadatas;
}

export async function generateStaticParams() {
  const staticParams = await getBlogStaticParams();
  return staticParams;
}

const CUSTOM_CRUMB_MIN_DEPTH = 3;

export default async function Page({ params }: BlogPostPageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  const [category, subcategory, slug] = [params[BlogTaxonomy.CATEGORY], params[BlogTaxonomy.SUBCATEGORY], params[BlogTaxonomy.SLUG]];

  const post: MaybeNull<BlogPostType> = await getBlogPostUnstrict(category, subcategory, slug, language);
  if (!post) notFound();

  // eslint-disable-next-line no-magic-numbers
  const depth = countCharacter(ROUTES_ROOTS.BLOG, '/') - 1 + CUSTOM_CRUMB_MIN_DEPTH;

  return (
    <>
      <div className="mx-8 flex flex-col items-center lg:mx-auto lg:max-w-[750px]">
        <Breadcrumbs
          customCrumbs={[
            {
              jsx: <BlogPostCrumb label={post.title} url={post.url} />,
              depth
            }
          ]}
          className="my-4 w-fit self-start"
        />
      </div>
      <div data-pagefind-filter={documentTypeInlineFilter('BlogPost')} className="mx-4 flex flex-col items-center lg:mx-24">
        <BlogPost className="mx-4" params={params} />
      </div>
    </>
  );
}

// Stryker restore all
/* v8 ignore stop */
