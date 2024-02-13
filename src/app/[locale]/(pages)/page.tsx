/* v8 ignore start */
// Stryker disable all
import type { Page } from 'contentlayer/generated';
import type { I18nPageProps } from '@/types/Next';

import { getServerSideI18n, getStaticParams } from '@/i18n/server';
import { setStaticParamsLocale } from 'next-international/server';
import { getPageByLanguageAndPathStrict } from '@/lib/pages/api';
import { MAIN_CLS } from '@/components/config/styles/main';
import MDX from '@/components/layouts/blog/MdxComponent';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { buildPageTitle } from '@rtm/shared-lib/str';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';

export async function generateMetadata({ params }: I18nPageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  const document = getPageByLanguageAndPathStrict(language, 'index') as Page;
  const globalT = await getServerSideI18n();
  const { vocab } = i18ns;
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), document.title, true);
  const description = document.metadescription;
  return { description, title };
}

export function generateStaticParams() {
  return getStaticParams();
}

export default function Page({ params }: I18nPageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);
  const document = getPageByLanguageAndPathStrict(language, 'index') as Page;

  return (
    <main className={cn('flex flex-1 flex-col justify-center', MAIN_CLS)}>
      <MDX code={document.body.code} />
    </main>
  );
}
// Stryker restore all
/* v8 ignore stop */
