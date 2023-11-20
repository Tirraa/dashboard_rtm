import ROUTES_ROOTS from '##/config/routes';
import BlogTaxonomy from '##/config/taxonomies/blog';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import BlogPost from '@/components/pages/blog/BlogPost';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import BlogPostCrumb from '@/components/ui/breadcrumbs/custom/BlogPostCrumb';
import { getBlogPostUnstrict } from '@/lib/blog';
import { blogPostGuard, getBlogPostMetadatas, getBlogStaticParams } from '@/lib/blog/staticGeneration';
import { countCharacter } from '@/lib/str';
import type { BlogPostPageProps, PostBase } from '@/types/Blog';
import type { Maybe } from '@/types/CustomUtilityTypes';
import { setStaticParamsLocale } from 'next-international/server';
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

  const post: Maybe<PostBase> = await getBlogPostUnstrict(category, subcategory, slug, language);
  if (!post) notFound();

  const MIN_DEPTH = 3;
  const depth = countCharacter(ROUTES_ROOTS.BLOG, '/') - 1 + MIN_DEPTH;

  return (
    <div className="mx-4 flex flex-col items-center lg:mx-24">
      <Breadcrumbs
        customCrumbs={[
          {
            depth,
            jsx: <BlogPostCrumb label={post.title} url={post.url} />
          }
        ]}
        className="mx-8 w-full py-4 lg:mx-auto lg:max-w-[750px]"
      />
      <BlogPost params={params} />
    </div>
  );
}
