import I18nTaxonomy from '##/config/taxonomies/i18n';
import SubcategoryRelatedBlogPosts from '@/components/pages/blog/SubcategoryRelatedBlogPosts';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import { blogSubcategoryGuard, getBlogStaticParams, getBlogSubcategoryMetadatas } from '@/lib/blog/staticGeneration';
import type { BlogSubcategoryPageProps } from '@/types/Blog';
import { setStaticParamsLocale } from 'next-international/server';

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
      <Breadcrumbs className="w-fit self-start py-4" />
      <SubcategoryRelatedBlogPosts params={params} />
    </div>
  );
}
