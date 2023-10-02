import DashboardLayoutClient from '@/components/layouts/dashboard/DashboardLayoutClient';
import LoginButton from '@/components/shared/cta/LoginButton';
import authOptions from '@/config/Auth/authOptions';
import { i18ns } from '@/config/i18n';
import { getServerSideI18n, getStaticParams } from '@/i18n/server';
import i18nTaxonomy from '@/taxonomies/i18n';
import { LayoutBaseProps } from '@/types/Next';
import { getServerSession } from 'next-auth/next';
import { setStaticParamsLocale } from 'next-international/server';

interface DashboardLayoutProps extends LayoutBaseProps {}

export function generateStaticParams() {
  return getStaticParams();
}

export default async function DashboardLayout({ params, children }: DashboardLayoutProps) {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(lng);

  const globalT = await getServerSideI18n();
  const session = await getServerSession(authOptions);

  return session ? (
    <DashboardLayoutClient {...{ children }} />
  ) : (
    <main className="m-auto text-center">
      <LoginButton label={globalT(`${i18ns.auth}.login`)} className="w-fit" />
    </main>
  );
}
