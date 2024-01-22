/* v8 ignore start */
// Stryker disable all
import type { I18nPageProps } from '@/types/Next';

import { getServerSideI18n, getStaticParams } from '@/i18n/server';
import { setStaticParamsLocale } from 'next-international/server';
import SignupButton from '@/components/ui/cta/SignupButton';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { buildPageTitle } from '@rtm/shared-lib/str';
import { getServerSession } from 'next-auth';
import ROUTES_ROOTS from '##/config/routes';
import { redirect } from 'next/navigation';
import { i18ns } from '##/config/i18n';

export async function generateMetadata() {
  const globalT = await getServerSideI18n();
  const { pagesTitles, manualSEO, vocab } = i18ns;
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), globalT(`${pagesTitles}.sign-up`), true);
  const description = globalT(`${manualSEO}.signup.meta-description`);
  return { description, title };
}

export async function generateStaticParams() {
  return getStaticParams();
}

export default async function Page({ params }: I18nPageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  const session = await getServerSession();
  if (session) redirect(ROUTES_ROOTS.DASHBOARD);

  return <SignupButton />;
}
// Stryker restore all
/* v8 ignore stop */
