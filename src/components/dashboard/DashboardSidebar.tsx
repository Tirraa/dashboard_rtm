'use client';

import dashboardRoutes, { dashboardRoutesTitles } from '@/config/DashboardSidebar/routesImpl';
import dashboardRoutesSidebarComponents from '@/config/DashboardSidebar/utils/IconsMapping';
import { DashboardRoutesKeys } from '@/config/DashboardSidebar/utils/RoutesMapping';
import { I18nProviderClient, getClientSideI18n } from '@/i18n/client';
import { i18nComponentProps } from '@/types/Next';
import Link from 'next/link';
import { FunctionComponent, ReactElement } from 'react';

interface DashboardSidebarProps extends i18nComponentProps {}

function sidebarBtnsGenerator() {
  const keys = Object.keys(dashboardRoutesSidebarComponents);
  const lastKey = keys[keys.length - 1];
  const sidebarBtnsSeparator = <hr className="relative bottom-1 right-0.5 w-10 m-auto" />;

  const globalT = getClientSideI18n();
  return keys.map((k): ReactElement => {
    const k2 = k as DashboardRoutesKeys;
    const [btnComponent, href, i18nPath] = [dashboardRoutesSidebarComponents[k2], dashboardRoutes[k2], dashboardRoutesTitles[k2]];
    const title = globalT(i18nPath);

    return (
      <div key={`sidebar-btn-component-${k}`}>
        <Link {...{ title, href }}>
          <span className="sr-only">{title}</span>
          {btnComponent}
        </Link>
        {k !== lastKey && sidebarBtnsSeparator}
      </div>
    );
  });
}

const DashboardSidebarImpl = () => <aside className="fixed w-20 h-screen border-r-[1px] p-4 bg-black flex flex-col">{sidebarBtnsGenerator()}</aside>;

export const DashboardSidebar: FunctionComponent<DashboardSidebarProps> = ({ i18nProps }) => (
  <I18nProviderClient>
    <DashboardSidebarImpl />
  </I18nProviderClient>
);

export default DashboardSidebar;
