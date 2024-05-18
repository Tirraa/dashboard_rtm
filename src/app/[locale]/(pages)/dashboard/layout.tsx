/* v8 ignore start */
// Stryker disable all

import type { LayoutBaseProps } from '@/types/Next';

import DASHBOARD_ROUTES, { DASHBOARD_ROUTES_TITLES } from '@/config/DashboardSidebar/routesImpl';
import DASHBOARD_ROUTES_SIDEBAR_COMPONENTS from '@/config/DashboardSidebar/utils/IconsMapping';
import DashboardLayoutClient from '@/components/layouts/dashboard/DashboardLayoutClient';
import { setStaticParamsLocale } from 'next-international/server';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import { getStaticParams } from '@/i18n/server';

interface DashboardLayoutProps extends LayoutBaseProps {}

export function generateStaticParams() {
  return getStaticParams();
}

export default function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const language = params[I18nTaxonomy.LANGUAGE];
  setStaticParamsLocale(language);

  return (
    <DashboardLayoutClient
      dashboardRoutesSidebarComponents={DASHBOARD_ROUTES_SIDEBAR_COMPONENTS}
      dashboardRoutesTitles={DASHBOARD_ROUTES_TITLES}
      dashboardRoutes={DASHBOARD_ROUTES}
    >
      {children}
    </DashboardLayoutClient>
  );
}

// Stryker restore all
/* v8 ignore stop */
