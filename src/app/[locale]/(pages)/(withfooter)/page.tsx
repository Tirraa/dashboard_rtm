/* v8 ignore start */
// Stryker disable all

import type { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import type { MaybeUndefined } from '@rtm/shared-types/CustomUtilityTypes';
import type { Page } from 'contentlayer/generated';
import type { I18nPageProps } from '@/types/Next';

import buildPageTitle from '@rtm/shared-lib/portable/str/buildPageTitle';
import InviteTheBotButton from '@/components/ui/cta/InviteTheBotButton';
import { getServerSideI18n, getStaticParams } from '@/i18n/server';
import { setStaticParamsLocale } from 'next-international/server';
import HomepageVideo from '@/components/ui/misc/HomepageVideo';
import { MAIN_CLS } from '@/components/config/styles/main';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import Logo from '@/components/ui/cta/Logo';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';

export async function generateMetadata() {
  const globalT = await getServerSideI18n();

  const metadataBase: MaybeUndefined<URL> = process.env.METADABASE_URL ? new URL(process.env.METADABASE_URL) : undefined;
  const openGraph: OpenGraph = { images: { url: '/assets/medias/img/og/logo/head.jpeg' } };

  const { metadescriptions, pagesTitles, vocab } = i18ns;
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), globalT(`${pagesTitles}.homepage`), true);
  const description = globalT(`${metadescriptions}.homepage`);

  return { alternates: { canonical: '/' }, metadataBase, description, openGraph, title };
}

export function generateStaticParams() {
  return getStaticParams();
}

export default function Page({ params }: I18nPageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  return (
    <main className={cn('flex flex-1 flex-col justify-center', MAIN_CLS)}>
      <div className="text-center">
        <HomepageVideo />
        <div
          className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-slate-900 to-slate-700 opacity-75 blur-sm"
          style={{ zIndex: -1 }}
        />
        <div style={{ boxShadow: 'inset 0 0 70vw 11vw rgba(0, 0, 0, 1)', zIndex: -1 }} className="absolute bottom-0 left-0 h-full w-full" />
        <Logo onPageEnterAnimation animatedOnHover height={201.45} width={226} clickable />
        <InviteTheBotButton className="mt-2" />
      </div>
    </main>
  );
}

// Stryker restore all
/* v8 ignore stop */
