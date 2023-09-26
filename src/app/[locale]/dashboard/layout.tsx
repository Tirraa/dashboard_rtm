import options from '@/app/api/auth/[...nextauth]/options';
import DashboardSidebarDesktop from '@/components/dashboard/DashboardSidebarDesktop';
import { AUTH_ROUTES } from '@/config/Auth/routesImpl';
import DashboardSidebarDynamicRenderingConfig from '@/config/DashboardSidebar/dynamicRenderingConfig';
import { getStaticParams } from '@/i18n/server';
import i18nTaxonomy from '@/taxonomies/i18n';
import { LayoutBaseProps } from '@/types/Next';
import { getServerSession } from 'next-auth/next';
import { setStaticParamsLocale } from 'next-international/server';
import { redirect } from 'next/navigation';

const { DASHBOARD_LAYOUT_MAIN_WRAPPER_ID } = DashboardSidebarDynamicRenderingConfig;

interface DashboardLayoutProps extends LayoutBaseProps {}

export function generateStaticParams() {
  return getStaticParams();
}

export default async function DashboardLayout({ params, children }: DashboardLayoutProps) {
  const lng = params[i18nTaxonomy.LANG_FLAG];
  setStaticParamsLocale(lng);
  const session = await getServerSession(options);
  if (!session) redirect(AUTH_ROUTES.LOGIN);

  return (
    <>
      <DashboardSidebarDesktop />
      <div className="flex flex-1 p-0 overflow-auto" id={DASHBOARD_LAYOUT_MAIN_WRAPPER_ID}>
        <main className="h-full w-full">{children}</main>
      </div>
    </>
  );
}
