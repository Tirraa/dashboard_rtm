import I18nTaxonomy from '##/config/taxonomies/i18n';
import CategoryRelatedSubcategoriesAndBlogPosts from '@/components/pages/blog/CategoryRelatedSubcategoriesAndBlogPosts';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import blogCategoryGuard from '@/lib/blog/guards/blogCategoryGuard';
import { getBlogCategoryMetadatas, getBlogStaticParams } from '@/lib/blog/staticGeneration';
import type { BlogCategoryPageProps } from '@/types/Blog';
import { setStaticParamsLocale } from 'next-international/server';

export async function generateMetadata({ params }: BlogCategoryPageProps) {
  await blogCategoryGuard({ params });
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
      <Breadcrumbs className="w-full py-4" />
      <CategoryRelatedSubcategoriesAndBlogPosts params={params} />
    </div>
  );
}
