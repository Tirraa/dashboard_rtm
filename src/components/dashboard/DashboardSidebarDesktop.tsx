'use client';

import NavbarConfig from '@/components/_config/_styles/Navbar';
import DashboardSidebarDynamicRenderingConfig from '@/config/DashboardSidebar/dynamicRenderingConfig';
import DASHBOARD_ROUTES, { DASHBOARD_ROUTES_TITLES } from '@/config/DashboardSidebar/routesImpl';
import DASHBOARD_ROUTES_SIDEBAR_COMPONENTS from '@/config/DashboardSidebar/utils/IconsMapping';
import { DashboardRoutesKeys } from '@/config/DashboardSidebar/utils/RoutesMapping';
import { sidebarErrorsVocabAccessor } from '@/errors/vocab/errors/sidebar';
import { getClientSideI18n } from '@/i18n/client';
import { computeHTMLElementHeight, computeHTMLElementWidth } from '@/lib/html';
import ComputedNodeCtx from '@/lib/misc/executionCtx';
import { serverCtx } from '@/lib/next';
import Link from 'next/link';
import { FunctionComponent, ReactElement, useEffect, useLayoutEffect, useState } from 'react';
import SidebarBtnSeparator from './SidebarBtnsSeparator';

interface DashboardSidebarProps {}

const { MAIN_BOX_ID, ICON_CLASS: SIDEBAR_ICON_CLASS, ICON_SEPARATOR_WIDTH_FACTOR, ICON_MARGIN_X_FACTOR } = DashboardSidebarDynamicRenderingConfig;

const { NAVBAR_DESKTOP_BREAKPOINT_PX_VALUE, NAVBAR_ID } = NavbarConfig;

let desktopSidebarIsHidden = true;

function sidebarBtnsGenerator(separatorWidth: number) {
  const keys = Object.keys(DASHBOARD_ROUTES_SIDEBAR_COMPONENTS);
  const lastKey = keys[keys.length - 1];
  const sidebarBtnsSeparator = <SidebarBtnSeparator style={{ width: separatorWidth }} />;

  const globalT = getClientSideI18n();
  return keys.map((k): ReactElement => {
    const k2 = k as DashboardRoutesKeys;
    const [btnComponent, href, i18nPath] = [DASHBOARD_ROUTES_SIDEBAR_COMPONENTS[k2], DASHBOARD_ROUTES[k2], DASHBOARD_ROUTES_TITLES[k2]];
    const title = globalT(i18nPath);

    return (
      <div key={`${k}-sidebar-btn-component`} className="flex flex-col items-center m-2">
        <Link {...{ title, href }} className={SIDEBAR_ICON_CLASS}>
          <span className="sr-only">{title}</span>
          {btnComponent}
        </Link>
        {k !== lastKey && sidebarBtnsSeparator}
      </div>
    );
  });
}

export const DashboardSidebarDesktop: FunctionComponent<DashboardSidebarProps> = () => {
  const [dynamicWidth, setDynamicWidth] = useState<number>(0);
  const [dynamicSeparatorWidth, setDynamicSeparatorWidth] = useState<number>(0);
  const [dynamicTop, setDynamicTop] = useState<string>('0');

  function computeAndSetDynamicallyTopValue() {
    const navbarInstance: HTMLElement | null = NAVBAR_ID !== null ? document.getElementById(NAVBAR_ID) : null;

    if (NAVBAR_ID !== null && !navbarInstance) {
      console.error(sidebarErrorsVocabAccessor('UNABLE_TO_RETRIEVE_THE_NAVBAR_ELEMENT'));
      return;
    }

    const computedTop = navbarInstance ? computeHTMLElementHeight(navbarInstance) + 'px' : '0';
    setDynamicTop(computedTop);
  }

  function computeWidthAndSeparatorWidthDynamically(): [number, number] {
    const sidebarFirstIconInstance = document.querySelector(`.${SIDEBAR_ICON_CLASS}`);
    if (!sidebarFirstIconInstance) {
      console.error(sidebarErrorsVocabAccessor('UNABLE_TO_RETRIEVE_ANY_SIDEBAR_ICON'));
      return [0, 0];
    }

    const computedIconWidth = computeHTMLElementWidth(sidebarFirstIconInstance as HTMLElement);
    const computedWidth = computedIconWidth * ICON_MARGIN_X_FACTOR;
    const computedSeparatorWidth = computedIconWidth * ICON_SEPARATOR_WIDTH_FACTOR;
    return [computedWidth, computedSeparatorWidth];
  }

  function computeAndSetDynamicallyWidthAndSeparatorWidthValues() {
    const [computedWidth, computedSeparatorWidth] = computeWidthAndSeparatorWidthDynamically();
    setDynamicSeparatorWidth(computedSeparatorWidth);
    setDynamicWidth(computedWidth);
  }

  function injectMarginLeftInMainElement(marginLeft: number = -1) {
    function getComputedMarginLeft(marginLeft: number) {
      if (marginLeft !== -1) return marginLeft;
      const [computedOnTheFlyMarginLeft] = computeWidthAndSeparatorWidthDynamically();
      return computedOnTheFlyMarginLeft;
    }

    const mainBoxInstance = document.getElementById(MAIN_BOX_ID);
    if (!mainBoxInstance) {
      console.error(sidebarErrorsVocabAccessor('UNABLE_TO_RETRIEVE_MAIN_ELEMENT'));
      return;
    }

    const computedMarginLeft = getComputedMarginLeft(marginLeft);
    mainBoxInstance.style.marginLeft = computedMarginLeft + 'px';
  }

  function forceNewDynamicRender() {
    computeAndSetDynamicallyWidthAndSeparatorWidthValues();
    computeAndSetDynamicallyTopValue();
    injectMarginLeftInMainElement();
  }

  useEffect(
    () => {
      function handleResize() {
        if (serverCtx()) return;
        if (!desktopSidebarIsHidden && window.innerWidth < NAVBAR_DESKTOP_BREAKPOINT_PX_VALUE) {
          setDynamicWidth(0);
          injectMarginLeftInMainElement(0);
          desktopSidebarIsHidden = true;
        } else if (desktopSidebarIsHidden && window.innerWidth >= NAVBAR_DESKTOP_BREAKPOINT_PX_VALUE) {
          forceNewDynamicRender();
          desktopSidebarIsHidden = false;
        }
      }

      if (!serverCtx()) window.addEventListener('resize', handleResize);
      handleResize();

      return () => {
        if (!serverCtx()) window.removeEventListener('resize', handleResize);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useLayoutEffect(
    () => {
      if (!serverCtx() && window.innerWidth >= NAVBAR_DESKTOP_BREAKPOINT_PX_VALUE) {
        forceNewDynamicRender();
        desktopSidebarIsHidden = false;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ComputedNodeCtx.DEV
      ? [
          DashboardSidebarDynamicRenderingConfig.SIDEBAR_ICON_SIZE_PX_VALUE,
          DashboardSidebarDynamicRenderingConfig.ICON_MARGIN_X_FACTOR,
          DashboardSidebarDynamicRenderingConfig.ICON_SEPARATOR_WIDTH_FACTOR
        ]
      : []
  );

  return (
    <aside className="fixed overflow-y-auto w-0 border-r-[1px] bg-black" style={{ width: dynamicWidth, bottom: '0', left: '0', top: dynamicTop }}>
      <div className="flex flex-col [&>*:first-child]:mt-5 [&>*:last-child]:mb-5">{sidebarBtnsGenerator(dynamicSeparatorWidth)}</div>
    </aside>
  );
};

export default DashboardSidebarDesktop;
