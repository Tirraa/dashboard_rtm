'use client';

import SidebarCollapseButtonIconStyle, { SIZE_PX_VALUE } from '@/components/config/styles/sidebar/SidebarCollapseButtonIconStyle';
import SidebarCollapseButtonWrapperStyle from '@/components/config/styles/sidebar/SidebarCollapseButtonWrapperStyle';
import { i18ns } from '@/config/i18n';
import { useScopedI18n } from '@/i18n/client';
import { ArrowSmallDownIcon, ArrowSmallRightIcon } from '@heroicons/react/20/solid';
import type { FunctionComponent } from 'react';

interface DashboardSidebarCollapseButtonProps {
  isCollapsed: boolean;
  setIsCollapsed: Function;
}

const { isActiveClassList: btnIconIsActiveClassList, isNotActiveClassList: btnIconIsNotActiveClassList } = SidebarCollapseButtonIconStyle;

const { isActiveClassList: btnWrapperIsActiveClassList, isNotActiveClassList: btnWrapperIsNotActiveClassList } = SidebarCollapseButtonWrapperStyle;

export const DashboardSidebarCollapseButton: FunctionComponent<DashboardSidebarCollapseButtonProps> = ({ isCollapsed, setIsCollapsed }) => {
  const sidebarCollapseBtnIconClassList = isCollapsed ? btnIconIsActiveClassList : btnIconIsNotActiveClassList;
  const sidebarCollapseBtnWrapperClassList = !isCollapsed ? btnWrapperIsActiveClassList : btnWrapperIsNotActiveClassList;
  const sidebarCollapseBtnClassList =
    'relative m-auto w-12 h-8 bg-black dark:bg-card bottom-1 rounded-full rounded-b-full rounded-t-none lg:bottom-0 lg:rounded-r-full lg:w-8 lg:rounded-l-none lg:right-2 rtl:lg:-right-2 rtl:lg:rounded-l-full rtl:lg:rounded-r-none';

  const scopedT = useScopedI18n(`${i18ns.dashboard}.sr-only`);
  const ariaLabel = isCollapsed ? scopedT('show-sidebar') : scopedT('hide-sidebar');
  const ariaExpanded = isCollapsed ? 'false' : 'true';
  const type = 'button';

  return (
    <div onClick={() => setIsCollapsed(!isCollapsed)} className={sidebarCollapseBtnWrapperClassList}>
      <button
        className="relative bottom-1 m-auto hidden h-8 w-12 rounded-full rounded-b-full rounded-t-none bg-black dark:bg-card lg:bottom-0 lg:right-2 lg:inline lg:w-8 lg:rounded-l-none lg:rounded-r-full rtl:lg:-right-2 rtl:lg:rounded-l-full rtl:lg:rounded-r-none"
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        {...{ type }}
      >
        <ArrowSmallRightIcon width={SIZE_PX_VALUE} height={SIZE_PX_VALUE} className={sidebarCollapseBtnIconClassList} />
      </button>

      <button
        className="relative bottom-1 m-auto h-8 w-12 rounded-full rounded-b-full rounded-t-none bg-black dark:bg-card lg:bottom-0 lg:right-2 lg:hidden lg:w-8 lg:rounded-l-none lg:rounded-r-full rtl:lg:-right-2 rtl:lg:rounded-l-full rtl:lg:rounded-r-none"
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        {...{ type }}
      >
        <ArrowSmallDownIcon width={SIZE_PX_VALUE} height={SIZE_PX_VALUE} className={sidebarCollapseBtnIconClassList} />
      </button>
    </div>
  );
};

export default DashboardSidebarCollapseButton;
