/* v8 ignore start */
// Stryker disable all
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { LandingPageProps } from '@/types/LandingPage';
import type { LandingPage } from 'contentlayer/generated';

import { getLandingPagesStaticParams, getLandingPageMetadatas } from '@/lib/landingPages/staticGeneration';
import { getLandingPageByLanguageAndSlugUnstrict } from '@/lib/landingPages/api';
import LandingPageTaxonomy from '##/config/taxonomies/landingPages';
import { setStaticParamsLocale } from 'next-international/server';
import MDX from '@/components/layouts/blog/MdxComponent';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: LandingPageProps) {
  const metadatas = await getLandingPageMetadatas({ params });
  return metadatas;
}

export async function generateStaticParams() {
  const staticParams = await getLandingPagesStaticParams();
  return staticParams;
}

export default async function Page({ params }: LandingPageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  const slug = params[LandingPageTaxonomy.SLUG];
  const lp: MaybeNull<LandingPage> = await getLandingPageByLanguageAndSlugUnstrict(language, slug);
  if (!lp) notFound();

  return (
    <main className="max-w-full">
      <MDX code={lp.body.code} />
    </main>
  );
}
// Stryker restore all
/* v8 ignore stop */
