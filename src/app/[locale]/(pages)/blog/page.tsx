import type { I18nPageProps } from '@/types/Next';

import { setStaticParamsLocale } from 'next-international/server';
import MAIN_CLS from '@/components/config/styles/main';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getStaticParams } from '@/i18n/server';
import { cn } from '@/lib/tailwind';

export function generateStaticParams() {
  return getStaticParams();
}

export default function Page({ params }: I18nPageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  return (
    <main className={cn('flex flex-1 flex-col justify-center', MAIN_CLS)}>
      <p className="text-center">ToDo</p>
    </main>
  );
}
