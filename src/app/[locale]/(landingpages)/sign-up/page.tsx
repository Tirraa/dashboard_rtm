import LoginButton from '@/components/shared/cta/LoginButton';
import { i18ns } from '@/config/i18n';
import ROUTES_ROOTS from '@/config/routes';
import { getServerSideI18n, getStaticParams } from '@/i18n/server';
import { getPageTitle } from '@/lib/str';
import i18nTaxonomy from '@/taxonomies/i18n';
import { i18nPageProps } from '@/types/Next';
import { getServerSession } from 'next-auth';
import { setStaticParamsLocale } from 'next-international/server';
import { redirect } from 'next/navigation';

export async function generateMetadata() {
  const globalT = await getServerSideI18n();
  const title = getPageTitle(globalT(`${i18ns.vocab}.brand-short`), globalT(`${i18ns.pagesTitles}.sign-up`), true);
  const description = globalT(`${i18ns.manualSEO}.signup.meta-description`);
  return { title, description };
}

export function generateStaticParams() {
  return getStaticParams();
}

export default async function Page({ params }: i18nPageProps) {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(lng);

  const session = await getServerSession();
  if (session) redirect(ROUTES_ROOTS.DASHBOARD);

  const globalT = await getServerSideI18n();
  return <LoginButton label={globalT(`${i18ns.auth}.signup`)} className="w-fit" />;
}
