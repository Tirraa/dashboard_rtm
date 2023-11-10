import { MAIN_UI_RELATED_CLS } from '@/components/config/styles/next-ui';
import Homepage from '@/components/pages/Homepage';
import { getServerSideI18n, getStaticParams } from '@/i18n/server';
import { buildPageTitle } from '@/lib/str';
import { cn } from '@/lib/tailwind';
import i18nTaxonomy from '@/taxonomies/i18n';
import type { i18nPageProps } from '@/types/Next';
import { i18ns } from 'interop/config/i18n';
import { setStaticParamsLocale } from 'next-international/server';

export async function generateMetadata() {
  const globalT = await getServerSideI18n();
  const title = buildPageTitle(globalT(`${i18ns.vocab}.brand-short`), globalT(`${i18ns.pagesTitles}.homepage`), true);
  const description = globalT(`${i18ns.manualSEO}.homepage.meta-description`);
  return { title, description };
}

export function generateStaticParams() {
  return getStaticParams();
}

export default function Page({ params }: i18nPageProps) {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(lng);

  return (
    <main className={cn('flex flex-1 flex-col justify-center', MAIN_UI_RELATED_CLS)}>
      <Homepage />
    </main>
  );
}
