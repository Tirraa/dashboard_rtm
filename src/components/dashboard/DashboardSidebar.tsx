'use client';

import DashboardSidebarDynamicRenderingConfig from '@/config/DashboardSidebar/dynamicRenderingConfig';
import dashboardRoutes, { dashboardRoutesTitles } from '@/config/DashboardSidebar/routesImpl';
import dashboardRoutesSidebarComponents from '@/config/DashboardSidebar/utils/IconsMapping';
import { DashboardRoutesKeys } from '@/config/DashboardSidebar/utils/RoutesMapping';
import { I18nProviderClient, getClientSideI18n } from '@/i18n/client';
import { computeHTMLElementHeight, computeHTMLElementWidth } from '@/lib/html';
import Link from 'next/link';
import { FunctionComponent, ReactElement, useEffect, useRef, useState } from 'react';
import NavbarConfig from '../_config/_styles/Navbar';
import SidebarBtnSeparator from './SidebarBtnsSeparator';

interface DashboardSidebarProps {}

const { MAIN_BOX_ID, ICON_CLASS: SIDEBAR_ICON_CLASS } = DashboardSidebarDynamicRenderingConfig;

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

function DashboardSidebarImpl() {
  const sidebarInstanceRef = useRef<HTMLDivElement>(null);
  const [dynamicWidth, setDynamicWidth] = useState<number>(-1);
  const [dynamicPaddingBottom, setDynamicPaddingBottom] = useState<number>(0);
  const [dynamicSeparatorWidth, setDynamicSeparatorWidth] = useState<number>(-1);
  const [dynamicLeft, setDynamicLeft] = useState<string>('100vw');

  useEffect(
    () => {
      const sidebarFirstIconInstance = document.querySelector(`.${SIDEBAR_ICON_CLASS}`);
      const mainBoxInstance = document.querySelector(`#${MAIN_BOX_ID}`) as HTMLElement;
      const navbarInstance: HTMLElement | null =
        NavbarConfig.NAVBAR_ID !== null ? (document.querySelector(`#${NavbarConfig.NAVBAR_ID}`) as HTMLElement) : null;

      if (!sidebarFirstIconInstance) {
        console.error("DashboardSidebar: Unable to retrieve any sidebar icon! The sidebar won't be displayed.");
        return;
      }

      if (!mainBoxInstance) {
        console.error("DashboardSidebar: Unable to retrieve your <main> element! The sidebar won't be displayed.");
        return;
      }

      if (!navbarInstance && navbarInstance !== null) {
        console.error(
          "DashboardSidebar: Unable to retrieve your navbar element! If you don't have any navbar, set the NAVBAR_ID value to `null`. The sidebar won't be displayed."
        );
        return;
      }

      const computedPaddingBottom = navbarInstance ? computeHTMLElementHeight(navbarInstance) : 0;
      const computedIconWidth = computeHTMLElementWidth(sidebarFirstIconInstance as HTMLElement);
      const computedSeparatorWidth = computedIconWidth * DashboardSidebarDynamicRenderingConfig.ICON_SEPARATOR_WIDTH_FACTOR;
      const computedWidth = computedIconWidth * DashboardSidebarDynamicRenderingConfig.ICON_MARGIN_X_FACTOR;
      if (mainBoxInstance) {
        mainBoxInstance.classList.add('transition-[margin-left]');
        mainBoxInstance.style.marginLeft = computedWidth + 'px';
      }
      setDynamicSeparatorWidth(computedSeparatorWidth);
      setDynamicWidth(computedWidth);
      setDynamicLeft('0');
      setDynamicPaddingBottom(computedPaddingBottom);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      sidebarInstanceRef,
      DashboardSidebarDynamicRenderingConfig.SIDEBAR_ICON_SIZE_PX_VALUE,
      DashboardSidebarDynamicRenderingConfig.ICON_MARGIN_X_FACTOR,
      DashboardSidebarDynamicRenderingConfig.ICON_SEPARATOR_WIDTH_FACTOR
    ]
  );

  return (
    <aside
      ref={sidebarInstanceRef}
      className="w-0 transition-[width] overflow-y-auto fixed h-screen border-r-[1px] bg-black flex flex-col"
      style={{ width: dynamicWidth, left: dynamicLeft, paddingBottom: dynamicPaddingBottom }}
    >
      <div className="flex flex-col h-fit [&>*:first-child]:mt-5">{sidebarBtnsGenerator(dynamicSeparatorWidth)}</div>
    </aside>
  );
}

export const DashboardSidebar: FunctionComponent<DashboardSidebarProps> = () => (
  <I18nProviderClient>
    <DashboardSidebarImpl />
  </I18nProviderClient>
);

export default DashboardSidebar;
