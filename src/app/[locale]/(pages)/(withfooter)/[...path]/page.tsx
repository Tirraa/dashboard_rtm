import type { PageProps } from '@/types/Page';

import { getPagesStaticParams, getPagesMetadatas } from '@/lib/pages/staticGeneration';
import isSkippedPath from '@/lib/pages/static/helpers/isSkippedPath';
import { getPageByLanguageAndPathUnstrict } from '@/lib/pages/api';
import { setStaticParamsLocale } from 'next-international/server';
import PageMDX from '@/components/layouts/pages/MdxComponent';
import MAIN_CLS from '@/components/config/styles/main';
import PageTaxonomy from '##/config/taxonomies/pages';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { notFound } from 'next/navigation';
import { cn } from '@/lib/tailwind';

export async function generateMetadata({ params }: PageProps) {
  const metadatas = await getPagesMetadatas({ params });
  return metadatas;
}

export function generateStaticParams() {
  const staticParams = getPagesStaticParams();
  return staticParams;
}

export default function Page({ params }: PageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  const path = params[PageTaxonomy.PATH].join('/');
  if (isSkippedPath(path)) notFound();

  const page = getPageByLanguageAndPathUnstrict(language, path);
  if (!page) notFound();

  return (
    <main className={cn('max-w-full', MAIN_CLS)}>
      <PageMDX code={page.body.code} />
    </main>
  );
}
