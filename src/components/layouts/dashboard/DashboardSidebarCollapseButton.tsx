'use client';

import type { FunctionComponent } from 'react';

import SidebarCollapseButtonWrapperStyle from '@/components/config/styles/sidebar/SidebarCollapseButtonWrapperStyle';
import SidebarCollapseButtonIconStyle from '@/components/config/styles/sidebar/SidebarCollapseButtonIconStyle';
import { ArrowRightIcon, ArrowDownIcon } from '@radix-ui/react-icons';
import { useScopedI18n } from '@/i18n/client';
import cn from '@/lib/portable/tailwind/cn';
import { i18ns } from '##/config/i18n';

interface DashboardSidebarCollapseButtonProps {
  setIsCollapsed: (isCollapsed: boolean) => unknown;
  isCollapsed: boolean;
}

const { isNotActiveClassList: btnIconIsNotActiveClassList, isActiveClassList: btnIconIsActiveClassList } = SidebarCollapseButtonIconStyle;

const { isNotActiveClassList: btnWrapperIsNotActiveClassList, isActiveClassList: btnWrapperIsActiveClassList } = SidebarCollapseButtonWrapperStyle;

const DashboardSidebarCollapseButton: FunctionComponent<DashboardSidebarCollapseButtonProps> = ({ setIsCollapsed, isCollapsed }) => {
  const sidebarCollapseBtnIconClassList = isCollapsed ? btnIconIsActiveClassList : btnIconIsNotActiveClassList;
  const sidebarCollapseBtnWrapperClassList = !isCollapsed ? btnWrapperIsActiveClassList : btnWrapperIsNotActiveClassList;
  const sidebarCollapseBtnClassList =
    'relative bottom-1 m-auto h-8 w-12 rounded-full rounded-b-full rounded-t-none bg-black dark:bg-card lg:bottom-0 lg:right-2 lg:w-8 lg:rounded-l-none lg:rounded-r-full rtl:lg:-right-2 rtl:lg:rounded-l-full rtl:lg:rounded-r-none';

  const scopedT = useScopedI18n(`${i18ns.dashboard}.sr-only`);
  const ariaLabel = isCollapsed ? scopedT('show-sidebar') : scopedT('hide-sidebar');
  const ariaExpanded = isCollapsed ? 'false' : 'true';
  const type = 'button';

  return (
    <div className={sidebarCollapseBtnWrapperClassList} onClick={() => setIsCollapsed(!isCollapsed)}>
      <button className={cn(sidebarCollapseBtnClassList, 'hidden lg:inline')} aria-expanded={ariaExpanded} aria-label={ariaLabel} type={type}>
        <ArrowRightIcon className={sidebarCollapseBtnIconClassList} />
      </button>

      <button className={cn(sidebarCollapseBtnClassList, 'lg:hidden')} aria-expanded={ariaExpanded} aria-label={ariaLabel} type={type}>
        <ArrowDownIcon className={sidebarCollapseBtnIconClassList} />
      </button>
    </div>
  );
};

export default DashboardSidebarCollapseButton;
