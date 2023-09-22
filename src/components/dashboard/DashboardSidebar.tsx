'use client';

import NavbarConfig from '@/components/_config/_styles/Navbar';
import DashboardSidebarDynamicRenderingConfig from '@/config/DashboardSidebar/dynamicRenderingConfig';
import dashboardRoutes, { dashboardRoutesTitles } from '@/config/DashboardSidebar/routesImpl';
import dashboardRoutesSidebarComponents from '@/config/DashboardSidebar/utils/IconsMapping';
import { DashboardRoutesKeys } from '@/config/DashboardSidebar/utils/RoutesMapping';
import { sidebarErrorsVocabAccessor } from '@/errors/vocab/errors/sidebar';
import { getClientSideI18n } from '@/i18n/client';
import { computeHTMLElementHeight, computeHTMLElementWidth } from '@/lib/html';
import ComputedNodeCtx from '@/lib/misc/executionCtx';
import Link from 'next/link';
import { FunctionComponent, ReactElement, useEffect, useRef, useState } from 'react';
import SidebarBtnSeparator from './SidebarBtnsSeparator';

interface DashboardSidebarProps {}

// {ToDo} Improve dynamic padding-bottom computation of the sidebar, on resize
const { MAIN_BOX_ID, ICON_CLASS: SIDEBAR_ICON_CLASS, ICON_SEPARATOR_WIDTH_FACTOR, ICON_MARGIN_X_FACTOR } = DashboardSidebarDynamicRenderingConfig;

function sidebarBtnsGenerator(separatorWidth: number) {
  const keys = Object.keys(dashboardRoutesSidebarComponents);
  const lastKey = keys[keys.length - 1];
  const sidebarBtnsSeparator = <SidebarBtnSeparator style={{ width: separatorWidth }} />;

  const globalT = getClientSideI18n();
  return keys.map((k): ReactElement => {
    const k2 = k as DashboardRoutesKeys;
    const [btnComponent, href, i18nPath] = [dashboardRoutesSidebarComponents[k2], dashboardRoutes[k2], dashboardRoutesTitles[k2]];
    const title = globalT(i18nPath);

    return (
      <div key={`sidebar-btn-component-${k}`} className="flex flex-col items-center m-2">
        <Link {...{ title, href }} className={SIDEBAR_ICON_CLASS}>
          <span className="sr-only">{title}</span>
          {btnComponent}
        </Link>
        {k !== lastKey && sidebarBtnsSeparator}
      </div>
    );
  });
}

export const DashboardSidebar: FunctionComponent<DashboardSidebarProps> = () => {
  const sidebarInstanceRef = useRef<HTMLDivElement>(null);
  const [dynamicWidth, setDynamicWidth] = useState<number>(0);
  const [dynamicPaddingBottom, setDynamicPaddingBottom] = useState<number>(0);
  const [dynamicSeparatorWidth, setDynamicSeparatorWidth] = useState<number>(0);
  const [dynamicLeft, setDynamicLeft] = useState<string>('100vw');

  useEffect(
    () => {
      const sidebarFirstIconInstance = document.querySelector(`.${SIDEBAR_ICON_CLASS}`);
      const mainBoxInstance = document.querySelector(`#${MAIN_BOX_ID}`) as HTMLElement;
      const navbarInstance: HTMLElement | null =
        NavbarConfig.NAVBAR_ID !== null ? (document.querySelector(`#${NavbarConfig.NAVBAR_ID}`) as HTMLElement) : null;

      if (!sidebarFirstIconInstance) {
        console.error(sidebarErrorsVocabAccessor('UNABLE_TO_RETRIEVE_ANY_SIDEBAR_ICON'));
        return;
      }

      if (!mainBoxInstance) {
        console.error(sidebarErrorsVocabAccessor('UNABLE_TO_RETRIEVE_MAIN_ELEMENT'));
        return;
      }

      if (NavbarConfig.NAVBAR_ID !== null && !navbarInstance) {
        console.error(sidebarErrorsVocabAccessor('UNABLE_TO_RETRIEVE_THE_NAVBAR_ELEMENT'));
        return;
      }

      const computedPaddingBottom = navbarInstance ? computeHTMLElementHeight(navbarInstance) : 0;
      const computedIconWidth = computeHTMLElementWidth(sidebarFirstIconInstance as HTMLElement);
      const computedSeparatorWidth = computedIconWidth * ICON_SEPARATOR_WIDTH_FACTOR;
      const computedWidth = computedIconWidth * ICON_MARGIN_X_FACTOR;
      setDynamicSeparatorWidth(computedSeparatorWidth);
      setDynamicWidth(computedWidth);
      setDynamicLeft('0');
      setDynamicPaddingBottom(computedPaddingBottom);
      if (mainBoxInstance) {
        mainBoxInstance.classList.add('transition-[margin-left]');
        mainBoxInstance.style.marginLeft = computedWidth + 'px';
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ComputedNodeCtx.DEV
      ? [
          sidebarInstanceRef,
          DashboardSidebarDynamicRenderingConfig.SIDEBAR_ICON_SIZE_PX_VALUE,
          DashboardSidebarDynamicRenderingConfig.ICON_MARGIN_X_FACTOR,
          DashboardSidebarDynamicRenderingConfig.ICON_SEPARATOR_WIDTH_FACTOR
        ]
      : [sidebarInstanceRef]
  );

  return (
    <aside
      ref={sidebarInstanceRef}
      className="w-0 transition-[width] fixed h-screen border-r-[1px] bg-black flex flex-col"
      style={{ width: dynamicWidth, left: dynamicLeft, paddingBottom: dynamicPaddingBottom }}
    >
      <div className="flex flex-col h-fit overflow-y-auto [&>*:first-child]:mt-5 [&>*:last-child]:mb-5">
        {sidebarBtnsGenerator(dynamicSeparatorWidth)}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
