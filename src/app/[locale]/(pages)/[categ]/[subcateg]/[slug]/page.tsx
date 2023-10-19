import BlogPost from '@/components/pages/blog/BlogPost';
import { getStaticParams } from '@/i18n/server';
import i18nTaxonomy from '@/taxonomies/i18n';
import { BlogPostPageProps } from '@/types/Blog';
import { setStaticParamsLocale } from 'next-international/server';

export async function generateStaticParams() {
  return getStaticParams(); // Comment it to isolate setStaticParamsLocale
  return [{}];
}

export default function Page({ params }: BlogPostPageProps) {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(lng);

  return <BlogPost {...{ params }} />;
}
