import authOptions from '@/config/Auth/authOptions';
import DashboardLayoutClient from '@/components/layouts/dashboard/DashboardLayoutClient';
import { AUTH_ROUTES } from '@/config/Auth/routesImpl';
import { getStaticParams } from '@/i18n/server';
import i18nTaxonomy from '@/taxonomies/i18n';
import { LayoutBaseProps } from '@/types/Next';
import { getServerSession } from 'next-auth/next';
import { setStaticParamsLocale } from 'next-international/server';
import { redirect } from 'next/navigation';

interface DashboardLayoutProps extends LayoutBaseProps {}

export function generateStaticParams() {
  return getStaticParams();
}

export default async function DashboardLayout({ params, children }: DashboardLayoutProps) {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(lng);
  const session = await getServerSession(authOptions);
  if (!session) redirect(AUTH_ROUTES.LOGIN);

  return <DashboardLayoutClient {...{ children }} />;
}
