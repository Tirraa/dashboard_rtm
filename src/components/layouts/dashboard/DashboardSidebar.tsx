'use client';

import DASHBOARD_ROUTES, { DASHBOARD_ROUTES_TITLES } from '@/config/DashboardSidebar/routesImpl';
import DASHBOARD_ROUTES_SIDEBAR_COMPONENTS from '@/config/DashboardSidebar/utils/IconsMapping';
import type { DashboardRoutesKeys } from '@/config/DashboardSidebar/utils/RoutesMapping';
import { getClientSideI18n, useCurrentLocale } from '@/i18n/client';
import { computeHTMLElementHeight, computeHTMLElementWidth, getDirection } from '@/lib/html';
import { getRefCurrentPtr } from '@/lib/react';
import { cn, getBreakpoint } from '@/lib/tailwind';
import { useMediaQuery } from '@react-hook/media-query';
import Link from 'next/link';
import type { FunctionComponent, ReactElement, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import DashboardSidebarCollapseButton from './DashboardSidebarCollapseButton';

interface DashboardSidebarProps {}

function sidebarBtnsGenerator(): ReactNode[] {
  const keys = Object.keys(DASHBOARD_ROUTES_SIDEBAR_COMPONENTS);
  const lastKey = keys[keys.length - 1];
  const sidebarBtnsSeparator = <hr className="m-auto my-2 hidden w-5/6 lg:block" />;

  const globalT = getClientSideI18n();
  return keys.map((k): ReactElement => {
    const k2 = k as DashboardRoutesKeys;
    const [btnComponent, href, i18nPath] = [DASHBOARD_ROUTES_SIDEBAR_COMPONENTS[k2], DASHBOARD_ROUTES[k2], DASHBOARD_ROUTES_TITLES[k2]];
    const title = globalT(i18nPath);

    return (
      <li key={`${k}-sidebar-btn-component`}>
        <Link {...{ title, href }} className="flex w-fit max-w-full flex-col rounded-lg">
          <span className="sr-only">{title}</span>
          {btnComponent}
        </Link>
        {k !== lastKey && sidebarBtnsSeparator}
      </li>
    );
  });
}

export const DashboardSidebar: FunctionComponent<DashboardSidebarProps> = () => {
  const wasCollapsed = useRef<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(wasCollapsed.current);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isLargeScreen = useMediaQuery(`(min-width: ${getBreakpoint('lg')}px)`);
  const currentLocale = useCurrentLocale();

  useEffect(() => {
    const sidebar = getRefCurrentPtr(sidebarRef);
    if (!sidebar) return;

    const EFFECT_CLASSES = ['transition-all', 'duration-300'];

    function applyUncollapsedStyles() {
      sidebar.style.marginLeft = '0';
      sidebar.style.marginRight = '0';
      sidebar.style.marginTop = '0';
      wasCollapsed.current = false;
    }

    function applyCollapsedStyles() {
      const direction = getDirection();
      if (isLargeScreen) {
        sidebar.style.marginTop = '0';
        if (direction === 'rtl') {
          sidebar.style.marginRight = '-' + computeHTMLElementWidth(sidebar) + 'px';
          sidebar.style.marginLeft = '0';
        } else {
          sidebar.style.marginLeft = '-' + computeHTMLElementWidth(sidebar) + 'px';
          sidebar.style.marginRight = '0';
        }
      } else {
        sidebar.style.marginLeft = '0';
        sidebar.style.marginTop = '-' + computeHTMLElementHeight(sidebar) + 'px';
      }
      wasCollapsed.current = true;
    }

    if (!isCollapsed) {
      if (!wasCollapsed.current) sidebar.classList.remove(...EFFECT_CLASSES);
      else sidebar.classList.add(...EFFECT_CLASSES);

      applyUncollapsedStyles();
      return;
    }

    if (wasCollapsed.current) sidebar.classList.remove(...EFFECT_CLASSES);
    else sidebar.classList.add(...EFFECT_CLASSES);
    applyCollapsedStyles();
  }, [isCollapsed, sidebarRef, isLargeScreen, currentLocale]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={'z-20 w-full justify-center border-t-[1px] border-muted-foreground bg-black dark:bg-card lg:w-fit lg:border-0'}
      >
        <nav className="py-4 lg:overflow-y-auto lg:px-[22px]">
          <ul className={cn('flex flex-wrap justify-center gap-2 lg:block')} role="menu">
            {sidebarBtnsGenerator()}
          </ul>
        </nav>
      </aside>
      <DashboardSidebarCollapseButton {...{ isCollapsed, setIsCollapsed }} />
    </>
  );
};

export default DashboardSidebar;
