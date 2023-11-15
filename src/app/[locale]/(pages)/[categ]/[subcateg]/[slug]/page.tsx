import i18nTaxonomy from '##/config/taxonomies/i18n';
import BlogPost from '@/components/pages/blog/BlogPost';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import BlogPostCrumb from '@/components/ui/breadcrumbs/custom/BlogPostCrumb';
import { blogPostGuard, getBlogPostMetadatas, getBlogStaticParams } from '@/lib/blog/staticGeneration';
import type { BlogPostPageProps } from '@/types/Blog';
import { setStaticParamsLocale } from 'next-international/server';

export async function generateMetadata({ params }: BlogPostPageProps) {
  await blogPostGuard({ params });
  const blogPostMetadatas = await getBlogPostMetadatas({ params });
  return blogPostMetadatas;
}

export async function generateStaticParams() {
  const staticParams = await getBlogStaticParams();
  return staticParams;
}

export default function Page({ params }: BlogPostPageProps) {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(lng);

  return (
    <div className="mx-4 flex flex-col items-center lg:mx-24">
      <Breadcrumbs
        customCrumbs={[
          {
            depth: 3,
            jsx: <BlogPostCrumb />
          }
        ]}
        className="mx-8 w-full py-4 lg:mx-auto lg:max-w-[750px]"
      />
      <BlogPost params={params} />
    </div>
  );
}
