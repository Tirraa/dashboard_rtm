'use client';

import dashboardRoutes, { dashboardRoutesTitles } from '@/config/DashboardSidebar/routesImpl';
import dashboardRoutesSidebarComponents from '@/config/DashboardSidebar/utils/IconsMapping';
import { DashboardRoutesKeys } from '@/config/DashboardSidebar/utils/RoutesMapping';
import { LanguageFlag } from '@/config/i18n';
import { getClientSideTranslation } from '@/i18n/client';
import i18nTaxonomy from '@/taxonomies/i18n';
import { i18nComponentProps } from '@/types/Next';
import Link from 'next/link';
import { FunctionComponent, ReactElement } from 'react';

interface DashboardSidebarProps extends i18nComponentProps {}

function sidebarBtnsGenerator(lng: LanguageFlag) {
  const keys = Object.keys(dashboardRoutesSidebarComponents);
  const lastKey = keys[keys.length - 1];
  const sidebarBtnsSeparator = <hr className="relative bottom-1 right-0.5 w-10 m-auto" />;

  return keys.map((k): ReactElement => {
    const k2 = k as DashboardRoutesKeys;
    const [btnComponent, href, i18nTitleInfos] = [dashboardRoutesSidebarComponents[k2], dashboardRoutes[k2], dashboardRoutesTitles[k2]];
    const { targetKey, ns, options } = i18nTitleInfos;
    const { t } = getClientSideTranslation(lng, ns, options);
    const title = t(targetKey);

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

export const DashboardSidebar: FunctionComponent<DashboardSidebarProps> = ({ i18nProps }) => (
  <aside className="fixed w-20 h-screen border-r-[1px] p-4 bg-black flex flex-col">{sidebarBtnsGenerator(i18nProps[i18nTaxonomy.langFlag])}</aside>
);

export default DashboardSidebar;
