import HomepageInner from '@/components/pagesInner/Homepage';
import { getStaticParams } from '@/i18n/server';
import i18nTaxonomy from '@/taxonomies/i18n';
import { i18nPageProps } from '@/types/Next';
import { setStaticParamsLocale } from 'next-international/server';

export function generateStaticParams() {
  return getStaticParams();
}

export default function Page({ params }: i18nPageProps) {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(lng);

  return (
    <main className="flex flex-1 flex-col align-center justify-center text-center p-0">
      <HomepageInner />
    </main>
  );
}
