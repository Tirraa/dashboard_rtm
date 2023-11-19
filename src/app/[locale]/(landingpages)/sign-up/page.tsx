import { i18ns } from '##/config/i18n';
import ROUTES_ROOTS from '##/config/routes';
import i18nTaxonomy from '##/config/taxonomies/i18n';
import SignupButton from '@/components/ui/cta/SignupButton';
import { getServerSideI18n, getStaticParams } from '@/i18n/server';
import { buildPageTitle } from '@/lib/str';
import type { I18nPageProps } from '@/types/Next';
import { getServerSession } from 'next-auth';
import { setStaticParamsLocale } from 'next-international/server';
import { redirect } from 'next/navigation';

export async function generateMetadata() {
  const globalT = await getServerSideI18n();
  const title = buildPageTitle(globalT(`${i18ns.vocab}.brand-short`), globalT(`${i18ns.pagesTitles}.sign-up`), true);
  const description = globalT(`${i18ns.manualSEO}.signup.meta-description`);
  return { title, description };
}

export function generateStaticParams() {
  return getStaticParams();
}

export default async function Page({ params }: I18nPageProps) {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(lng);

  const session = await getServerSession();
  if (session) redirect(ROUTES_ROOTS.DASHBOARD);

  return <SignupButton />;
}
