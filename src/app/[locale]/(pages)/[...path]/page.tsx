import type { PageProps } from '@/types/Page';

import { getPagesStaticParams, getPagesMetadatas } from '@/lib/pages/staticGeneration';
import { getPageByLanguageAndPathUnstrict } from '@/lib/pages/api';
import { setStaticParamsLocale } from 'next-international/server';
import MDX from '@/components/layouts/blog/MdxComponent';
import PageTaxonomy from '##/config/taxonomies/pages';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: PageProps) {
  const metadatas = await getPagesMetadatas({ params });
  return metadatas;
}

export async function generateStaticParams() {
  const staticParams = getPagesStaticParams();
  return staticParams;
}

export default function Page({ params }: PageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  const path = params[PageTaxonomy.PATH].join('/');
  const page = getPageByLanguageAndPathUnstrict(language, path);

  if (!page) notFound();
  return (
    <main className="max-w-full">
      <MDX code={page.body.code} />
    </main>
  );
}
