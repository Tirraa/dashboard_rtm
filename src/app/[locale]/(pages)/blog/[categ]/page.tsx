/* v8 ignore start */
// Stryker disable all

import type { BlogCategoryPageProps } from '@/types/Blog';

import CategoryRelatedSubcategoriesAndBlogPosts from '@/components/pages/blog/CategoryRelatedSubcategoriesAndBlogPosts';
import { getBlogCategoryMetadatas, getBlogStaticParams, blogCategoryGuard } from '@/lib/blog/staticGeneration';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import { setStaticParamsLocale } from 'next-international/server';
import I18nTaxonomy from '##/config/taxonomies/i18n';

export async function generateMetadata({ params }: BlogCategoryPageProps) {
  blogCategoryGuard({ params });
  const blogCategoryMetadatas = await getBlogCategoryMetadatas({ params });
  return blogCategoryMetadatas;
}

export async function generateStaticParams() {
  const staticParams = await getBlogStaticParams();
  return staticParams;
}

export default function Page({ params }: BlogCategoryPageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  return (
    <div className="mx-8 flex flex-col items-center lg:mx-auto lg:max-w-[750px]">
      <Breadcrumbs className="w-fit self-start py-4" />
      <CategoryRelatedSubcategoriesAndBlogPosts params={params} />
    </div>
  );
}

// Stryker restore all
/* v8 ignore stop */
