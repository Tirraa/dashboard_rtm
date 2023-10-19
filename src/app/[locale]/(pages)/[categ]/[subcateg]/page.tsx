import SubCategoryRelatedBlogPosts from '@/components/pages/blog/SubCategoryRelatedBlogPosts';
import { getStaticParams } from '@/i18n/server';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogSubCategoryPageProps } from '@/types/Blog';
import { setStaticParamsLocale } from 'next-international/server';

export async function generateStaticParams() {
  return getStaticParams(); // Comment it to isolate setStaticParamsLocale
  return [{}];
}

export default function Page({ params }: BlogSubCategoryPageProps) {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(lng);

  return <SubCategoryRelatedBlogPosts {...{ params }} />;
}
