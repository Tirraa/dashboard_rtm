import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { BlogPostPageProps, PostBase } from '@/types/Blog';

import { getBlogPostMetadatas, getBlogStaticParams, blogPostGuard } from '@/lib/blog/staticGeneration';
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

export default async function Page({ params }: BlogPostPageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  const category = params[BlogTaxonomy.CATEGORY];
  const subcategory = params[BlogTaxonomy.SUBCATEGORY];
  const slug = params[BlogTaxonomy.SLUG];

  const post: MaybeNull<PostBase> = await getBlogPostUnstrict(category, subcategory, slug, language);
  if (!post) notFound();

  const MIN_DEPTH = 3;
  const depth = countCharacter(ROUTES_ROOTS.BLOG, '/') - 1 + MIN_DEPTH;

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
          className="w-fit self-start py-4"
        />
      </div>
      <div className="mx-4 flex flex-col items-center lg:mx-24">
        <BlogPost className="mx-4" params={params} />
      </div>
    </>
  );
}
