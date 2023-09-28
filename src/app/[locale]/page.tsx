import HomepageInner from '@/components/pagesInner/Homepage';
import { i18ns } from '@/config/i18n';
import { getServerSideI18n, getStaticParams } from '@/i18n/server';
import { getPageTitle } from '@/lib/str';
import i18nTaxonomy from '@/taxonomies/i18n';
import { i18nPageProps } from '@/types/Next';
import { setStaticParamsLocale } from 'next-international/server';

export async function generateMetadata() {
  const globalT = await getServerSideI18n();
  const title = getPageTitle(globalT(`${i18ns.vocab}.brand-short`), globalT(`${i18ns.manualSEO}.homepage.title`), true);
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
    <main className="m-auto text-center">
      <HomepageInner />
    </main>
  );
}
