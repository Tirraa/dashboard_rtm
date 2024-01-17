/* v8 ignore start */
// Stryker disable all
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { LandingPageProps } from '@/types/LandingPage';
import type { LandingPage } from 'contentlayer/generated';

import { getLandingPageBySlugAndLanguageUnstrict } from '@/lib/landingPages/api';
import LandingPageTaxonomy from '##/config/taxonomies/landingPages';
import { setStaticParamsLocale } from 'next-international/server';
import { allLandingPages } from 'contentlayer/generated';
import MDX from '@/components/layouts/blog/MdxComponent';
import { buildPageTitle } from '@rtm/shared-lib/str';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getServerSideI18n } from '@/i18n/server';
import { notFound } from 'next/navigation';
import { i18ns } from '##/config/i18n';

export async function generateMetadata({ params }: LandingPageProps) {
  const [lang, slug] = [params[I18nTaxonomy.LANGUAGE], params[LandingPageTaxonomy.SLUG]];
  const lp: MaybeNull<LandingPage> = getLandingPageBySlugAndLanguageUnstrict(lang, slug);
  if (!lp) notFound();

  const globalT = await getServerSideI18n();
  const { metadescription: description, title: lpTitle } = lp;

  const { vocab } = i18ns;
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), lpTitle);

  return { description, title };
}

// {ToDo} Move this in the static generation API and handle drafts & testing
export async function generateStaticParams() {
  const staticParams = [];
  for (const { language, slug } of allLandingPages) staticParams.push({ [I18nTaxonomy.LANGUAGE]: language, [LandingPageTaxonomy.SLUG]: slug });

  return staticParams;
}

export default function Page({ params }: LandingPageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  const slug = params[LandingPageTaxonomy.SLUG];
  const lp: MaybeNull<LandingPage> = getLandingPageBySlugAndLanguageUnstrict(language, slug);

  if (!lp) notFound();
  return (
    <main className="max-w-full">
      <MDX code={lp.body.code} />
    </main>
  );
}
// Stryker restore all
/* v8 ignore stop */
