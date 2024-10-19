/* v8 ignore start */
// Stryker disable all

import type { BlogSubcategoryPageProps } from '@/types/Blog';

import { getBlogSubcategoryMetadatas, blogSubcategoryGuard, getBlogStaticParams } from '@/lib/blog/staticGeneration';
import SubcategoryRelatedBlogPosts from '@/components/pages/blog/SubcategoryRelatedBlogPosts/Server';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import { setStaticParamsLocale } from 'next-international/server';
import { buildAbsolutePathFromParts } from '@rtm/shared-lib/str';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import BlogTaxonomy from '##/config/taxonomies/blog';
import ROUTES_ROOTS from '##/config/routes';

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

  const categ = params[BlogTaxonomy.CATEGORY];
  const subcateg = params[BlogTaxonomy.SUBCATEGORY];
  const pathname = buildAbsolutePathFromParts(ROUTES_ROOTS.BLOG, categ, subcateg);

  return (
    <div className="mx-8 flex flex-col items-center lg:mx-auto lg:max-w-[750px]" data-pagefind-ignore="all">
      <Breadcrumbs className="my-4 w-fit self-start" pathname={pathname} />
      <SubcategoryRelatedBlogPosts params={params} />
    </div>
  );
}

// Stryker restore all
/* v8 ignore stop */
