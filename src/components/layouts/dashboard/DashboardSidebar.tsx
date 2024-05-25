'use client';

import type {
  DashboardRoutesSidebarReactElements,
  DashboardRoutesTitles,
  DashboardRoutesKeys,
  DashboardRoutes
} from '@/config/DashboardSidebar/utils/RoutesMapping';
import type { FunctionComponent, ReactElement } from 'react';
import type { AppPath } from '@rtm/shared-types/Next';

import hrefAndPathnameExactMatch from '@/lib/notPortable/str/hrefAndPathnameExactMatch';
import SidebarButtonStyle from '@/components/config/styles/sidebar/SidebarButtonStyle';
import getRefCurrentPtr from '@rtm/shared-lib/portable/react/getRefCurrentPtr';
import hrefMatchesPathname from '@/lib/notPortable/str/hrefMatchesPathname';
import getDirection from '@rtm/shared-lib/portable/html/getDirection';
import { getClientSideI18n, useCurrentLocale } from '@/i18n/client';
import useIsLargeScreen from '@/components/hooks/useIsLargeScreen';
import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import ROUTES_ROOTS from '##/config/routes';
import cn from '@/lib/portable/tailwind/cn';
import Link from 'next/link';

import DashboardSidebarCollapseButton from './DashboardSidebarCollapseButton';

interface DashboardSidebarProps {
  dashboardRoutesSidebarComponents: DashboardRoutesSidebarReactElements;
  dashboardRoutesTitles: DashboardRoutesTitles;
  dashboardRoutes: DashboardRoutes;
}

const { isNotActiveClassList, isActiveClassList } = SidebarButtonStyle;

function sidebarBtnsGenerator(
  currentPathname: AppPath,
  dashboardRoutes: DashboardRoutes,
  dashboardRoutesTitles: DashboardRoutesTitles,
  dashboardRoutesSidebarComponents: DashboardRoutesSidebarReactElements
): ReactElement[] {
  const keys = Object.keys(dashboardRoutesSidebarComponents);
  // eslint-disable-next-line no-magic-numbers
  const lastKey = keys[keys.length - 1];
  const sidebarBtnsSeparator = <hr className="m-auto my-2 hidden w-5/6 lg:block" />;

  const globalT = getClientSideI18n();
  return keys.map((k): ReactElement => {
    const k2 = k as DashboardRoutesKeys;
    const [btnComponent, href, i18nPath] = [dashboardRoutesSidebarComponents[k2], dashboardRoutes[k2], dashboardRoutesTitles[k2]];
    const title = globalT(i18nPath);

    const sidebarButtonClassName = hrefMatchesPathname(href, currentPathname, ROUTES_ROOTS.DASHBOARD) ? isActiveClassList : isNotActiveClassList;

    const exactMatch = hrefAndPathnameExactMatch(href, currentPathname);

    return (
      <li key={`${k}-sidebar-btn-component`}>
        <Link
          className={cn('flex w-fit max-w-full flex-col rounded-lg', sidebarButtonClassName)}
          aria-current={exactMatch ? 'page' : undefined}
          role="menuitem"
          title={title}
          href={href}
        >
          <span className="sr-only">{title}</span>
          {btnComponent}
        </Link>
        {k !== lastKey && sidebarBtnsSeparator}
      </li>
    );
  });
}

// {ToDo} https://github.com/Tirraa/dashboard_rtm/issues/126
const DashboardSidebar: FunctionComponent<DashboardSidebarProps> = ({ dashboardRoutesSidebarComponents, dashboardRoutesTitles, dashboardRoutes }) => {
  const wasCollapsed = useRef<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(wasCollapsed.current);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isLargeScreen = useIsLargeScreen();
  const currentLocale = useCurrentLocale();
  const currentPathname = usePathname();

  useEffect(() => {
    const sidebarInstance = getRefCurrentPtr(sidebarRef);
    if (!sidebarInstance) return;

    const EFFECT_CLASSES = ['transition-all', 'duration-300'];

    function applyUncollapsedStyles() {
      sidebarInstance.style.marginLeft = '0';
      sidebarInstance.style.marginRight = '0';
      sidebarInstance.style.marginTop = '0';
      wasCollapsed.current = false;
    }

    function applyCollapsedStyles() {
      const direction = getDirection();
      if (isLargeScreen) {
        sidebarInstance.style.marginTop = '0';
        if (direction === 'rtl') {
          sidebarInstance.style.marginRight = '-' + sidebarInstance.getBoundingClientRect().width + 'px';
          sidebarInstance.style.marginLeft = '0';
        } else {
          sidebarInstance.style.marginLeft = '-' + sidebarInstance.getBoundingClientRect().width + 'px';
          sidebarInstance.style.marginRight = '0';
        }
      } else {
        sidebarInstance.style.marginLeft = '0';
        sidebarInstance.style.marginTop = '-' + sidebarInstance.getBoundingClientRect().height + 'px';
      }
      wasCollapsed.current = true;
    }

    if (!isCollapsed) {
      if (!wasCollapsed.current) sidebarInstance.classList.remove(...EFFECT_CLASSES);
      else sidebarInstance.classList.add(...EFFECT_CLASSES);

      applyUncollapsedStyles();
      return;
    }

    if (wasCollapsed.current) sidebarInstance.classList.remove(...EFFECT_CLASSES);
    else sidebarInstance.classList.add(...EFFECT_CLASSES);
    applyCollapsedStyles();
  }, [isCollapsed, sidebarRef, isLargeScreen, currentLocale]);

  return (
    <>
      <aside
        className={'z-20 w-full justify-center border-t-[1px] border-muted-foreground bg-black dark:bg-card lg:w-fit lg:border-0'}
        ref={sidebarRef}
      >
        <nav className="py-4 text-white lg:overflow-y-auto lg:px-[22px]">
          <ul className={cn('flex flex-wrap justify-center gap-2 lg:block')} role="menu">
            {sidebarBtnsGenerator(currentPathname, dashboardRoutes, dashboardRoutesTitles, dashboardRoutesSidebarComponents)}
          </ul>
        </nav>
      </aside>
      <DashboardSidebarCollapseButton setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} />
    </>
  );
};

export default DashboardSidebar;
