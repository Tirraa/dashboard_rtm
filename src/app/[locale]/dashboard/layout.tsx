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

const { MAIN_BOX_ID } = DashboardSidebarDynamicRenderingConfig;

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
    <div className="flex flex-1 overflow-y-auto">
      <DashboardSidebarDesktop />
      <main className="flex flex-col w-full h-full p-0 overflow-auto" id={MAIN_BOX_ID}>
        <div className="h-full w-full">{children}</div>
      </main>
    </div>
  );
}
