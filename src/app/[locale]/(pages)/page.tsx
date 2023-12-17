import type { I18nPageProps } from '@/types/Next';

import { getServerSideI18n, getStaticParams } from '@/i18n/server';
import { setStaticParamsLocale } from 'next-international/server';
import { MAIN_CLS } from '@/components/config/styles/main';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { buildPageTitle } from '@rtm/shared-lib/str';
import Homepage from '@/components/pages/Homepage';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';

export async function generateMetadata() {
  const globalT = await getServerSideI18n();
  const { pagesTitles, manualSEO, vocab } = i18ns;
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), globalT(`${pagesTitles}.homepage`), true);
  const description = globalT(`${manualSEO}.homepage.meta-description`);
  return { description, title };
}

export function generateStaticParams() {
  return getStaticParams();
}

export default function Page({ params }: I18nPageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  return (
    <main className={cn('flex flex-1 flex-col justify-center', MAIN_CLS)}>
      <Homepage />
    </main>
  );
}
