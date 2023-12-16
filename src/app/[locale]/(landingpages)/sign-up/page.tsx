import { i18ns } from '##/config/i18n';
import ROUTES_ROOTS from '##/config/routes';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import SignupButton from '@/components/ui/cta/SignupButton';
import { getServerSideI18n, getStaticParams } from '@/i18n/server';
import type { I18nPageProps } from '@/types/Next';
import { buildPageTitle } from '@rtm/shared-lib/str';
import { getServerSession } from 'next-auth';
import { setStaticParamsLocale } from 'next-international/server';
import { redirect } from 'next/navigation';

export async function generateMetadata() {
  const globalT = await getServerSideI18n();
  const { vocab, pagesTitles, manualSEO } = i18ns;
  const title = buildPageTitle(globalT(`${vocab}.brand-short`), globalT(`${pagesTitles}.sign-up`), true);
  const description = globalT(`${manualSEO}.signup.meta-description`);
  return { title, description };
}

export function generateStaticParams() {
  return getStaticParams();
}

export default async function Page({ params }: I18nPageProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  const session = await getServerSession();
  if (session) redirect(ROUTES_ROOTS.DASHBOARD);

  return <SignupButton />;
}
