import CategoryRelatedSubCategoriesAndBlogPosts from '@/components/pages/blog/CategoryRelatedSubCategoriesAndBlogPosts';
import { getStaticParams } from '@/i18n/server';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogCategoryPageProps } from '@/types/Blog';
import { setStaticParamsLocale } from 'next-international/server';

export async function generateStaticParams() {
  return getStaticParams(); // Comment it to isolate setStaticParamsLocale
  return [{}];
}

export default function Page({ params }: BlogCategoryPageProps) {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(lng);

  return <CategoryRelatedSubCategoriesAndBlogPosts {...{ params }} />;
}
