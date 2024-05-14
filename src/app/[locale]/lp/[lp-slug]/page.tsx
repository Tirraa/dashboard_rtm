/* v8 ignore start */
// Stryker disable all

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { LandingPageProps } from '@/types/LandingPage';
import type { LandingPage } from 'contentlayer/generated';

import { getLandingPagesStaticParams, getLandingPageMetadatas } from '@/lib/landingPages/staticGeneration';
import documentTypeInlineFilter from '@/lib/pagefind/builders/documentTypeInlineFilter';
import { getLandingPageByLanguageAndSlugUnstrict } from '@/lib/landingPages/api';
import LandingPageTaxonomy from '##/config/taxonomies/landingPages';
import { setStaticParamsLocale } from 'next-international/server';
import LandingPageMDX from '@/components/layouts/lp/MdxComponent';
import { I18N_MIDDLEWARE_CONFIG } from '@/middlewares/withI18n';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: LandingPageProps) {
  const metadatas = await getLandingPageMetadatas({ params }, I18N_MIDDLEWARE_CONFIG.urlMappingStrategy);
  return metadatas;
}

export async function generateStaticParams() {
  const staticParams = await getLandingPagesStaticParams();
  return staticParams;
}

export default function Page({ params }: LandingPageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  const slug = params[LandingPageTaxonomy.SLUG];
  const lp: MaybeNull<LandingPage> = getLandingPageByLanguageAndSlugUnstrict(language, slug);
  if (!lp) notFound();

  return (
    <main
      data-pagefind-ignore={lp.doNotExcludeFromLocalSearch ? undefined : 'all'}
      data-pagefind-filter={documentTypeInlineFilter('LandingPage')}
      className="max-w-full"
    >
      <LandingPageMDX code={lp.body.code} />
    </main>
  );
}

// Stryker restore all
/* v8 ignore stop */
