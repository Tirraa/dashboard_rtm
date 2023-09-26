'use client';

import DASHBOARD_ROUTES, { DASHBOARD_ROUTES_TITLES } from '@/config/DashboardSidebar/routesImpl';
import DASHBOARD_ROUTES_SIDEBAR_COMPONENTS from '@/config/DashboardSidebar/utils/IconsMapping';
import { DashboardRoutesKeys } from '@/config/DashboardSidebar/utils/RoutesMapping';
import { getClientSideI18n } from '@/i18n/client';
import Link from 'next/link';
import { FunctionComponent, ReactElement, ReactNode, useLayoutEffect } from 'react';

interface DashboardSidebarProps {}

function sidebarBtnsGenerator(): ReactNode[] {
  const keys = Object.keys(DASHBOARD_ROUTES_SIDEBAR_COMPONENTS);
  const lastKey = keys[keys.length - 1];
  const sidebarBtnsSeparator = <hr className="m-auto my-2 w-5/6" />;

  const globalT = getClientSideI18n();
  return keys.map((k): ReactElement => {
    const k2 = k as DashboardRoutesKeys;
    const [btnComponent, href, i18nPath] = [DASHBOARD_ROUTES_SIDEBAR_COMPONENTS[k2], DASHBOARD_ROUTES[k2], DASHBOARD_ROUTES_TITLES[k2]];
    const title = globalT(i18nPath);

    return (
      <li key={`${k}-sidebar-btn-component`}>
        <Link {...{ title, href }} className="flex flex-col max-w-full text-white w-fit rounded-lg">
          <span className="sr-only">{title}</span>
          {btnComponent}
        </Link>
        {k !== lastKey && sidebarBtnsSeparator}
      </li>
    );
  });
}

export const DashboardSidebar: FunctionComponent<DashboardSidebarProps> = () => {
  useLayoutEffect(
    () => {
      const effectClasses = ['h-screen', 'overflow-hidden'];

      document.body.classList.add(...effectClasses);
      return () => document.body.classList.remove(...effectClasses);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <aside className="bg-black w-fit border-r-[1px] hidden lg:flex">
      <nav className="p-4 overflow-y-auto">
        <ul>{sidebarBtnsGenerator()}</ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
