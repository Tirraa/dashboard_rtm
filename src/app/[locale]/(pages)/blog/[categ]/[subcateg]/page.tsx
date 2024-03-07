/* v8 ignore start */
// Stryker disable all

import type { BlogSubcategoryPageProps } from '@/types/Blog';

import { getBlogSubcategoryMetadatas, blogSubcategoryGuard, getBlogStaticParams } from '@/lib/blog/staticGeneration';
import SubcategoryRelatedBlogPosts from '@/components/pages/blog/SubcategoryRelatedBlogPosts';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import { setStaticParamsLocale } from 'next-international/server';
import I18nTaxonomy from '##/config/taxonomies/i18n';

export async function generateMetadata({ params }: BlogSubcategoryPageProps) {
  await blogSubcategoryGuard({ params });
  const blogSubcategoryMetadatas = await getBlogSubcategoryMetadatas({ params });

  return blogSubcategoryMetadatas;
}

export async function generateStaticParams() {
  const staticParams = await getBlogStaticParams();
  return staticParams;
}

export default function Page({ params }: BlogSubcategoryPageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  return (
    <div className="mx-8 flex flex-col items-center lg:mx-auto lg:max-w-[750px]">
      <Breadcrumbs className="my-4 w-fit self-start" />
      <SubcategoryRelatedBlogPosts params={params} />
    </div>
  );
}

// Stryker restore all
/* v8 ignore stop */
