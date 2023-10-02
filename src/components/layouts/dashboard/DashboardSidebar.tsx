'use client';

import DASHBOARD_ROUTES, { DASHBOARD_ROUTES_TITLES } from '@/config/DashboardSidebar/routesImpl';
import DASHBOARD_ROUTES_SIDEBAR_COMPONENTS from '@/config/DashboardSidebar/utils/IconsMapping';
import { DashboardRoutesKeys } from '@/config/DashboardSidebar/utils/RoutesMapping';
import { getClientSideI18n } from '@/i18n/client';
import Link from 'next/link';
import { FunctionComponent, ReactElement, ReactNode } from 'react';

interface DashboardSidebarProps {}

function sidebarBtnsGenerator(): ReactNode[] {
  const keys = Object.keys(DASHBOARD_ROUTES_SIDEBAR_COMPONENTS);
  const lastKey = keys[keys.length - 1];
  const sidebarBtnsSeparator = <hr className="hidden lg:block m-auto my-2 w-5/6" />;

  const globalT = getClientSideI18n();
  return keys.map((k): ReactElement => {
    const k2 = k as DashboardRoutesKeys;
    const [btnComponent, href, i18nPath] = [DASHBOARD_ROUTES_SIDEBAR_COMPONENTS[k2], DASHBOARD_ROUTES[k2], DASHBOARD_ROUTES_TITLES[k2]];
    const title = globalT(i18nPath);

    return (
      <li key={`${k}-sidebar-btn-component`}>
        <Link {...{ title, href }} className="flex flex-col max-w-full w-fit rounded-lg">
          <span className="sr-only">{title}</span>
          {btnComponent}
        </Link>
        {k !== lastKey && sidebarBtnsSeparator}
      </li>
    );
  });
}

export const DashboardSidebar: FunctionComponent<DashboardSidebarProps> = () => {
  return (
    <aside className="rtm sidebar bg-black w-full justify-center flex border-t-[1px] border-slate-800 lg:w-fit">
      <nav className="py-4 lg:px-4 overflow-x-auto lg:overflow-y-auto">
        <ul className="rtm sidebar-body flex gap-2 [&>*:first-child]:pl-4 lg:[&>*:first-child]:pl-0 [&>*:last-child]:pr-4 lg:[&>*:last-child]:pr-0 lg:block">
          {sidebarBtnsGenerator()}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
