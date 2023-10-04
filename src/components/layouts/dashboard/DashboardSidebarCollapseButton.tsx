'use client';

import SidebarCollapseButtonIconStyle, { SIZE_PX_VALUE } from '@/components/config/styles/sidebar/SidebarCollapseButtonIconStyle';
import SidebarCollapseButtonWrapperStyle from '@/components/config/styles/sidebar/SidebarCollapseButtonWrapperStyle';
import { ArrowSmallDownIcon, ArrowSmallRightIcon } from '@heroicons/react/20/solid';
import { FunctionComponent } from 'react';

interface DashboardSidebarCollapseButtonProps {
  isCollapsed: boolean;
  setIsCollapsed: Function;
}

const { isActiveClassList: btnIconIsActiveClassList, isNotActiveClassList: btnIconIsNotActiveClassList } = SidebarCollapseButtonIconStyle;

const { isActiveClassList: btnWrapperIsActiveClassList, isNotActiveClassList: btnWrapperIsNotActiveClassList } = SidebarCollapseButtonWrapperStyle;

// {ToDo} Some sr-only elements/aria-labels for accessibility concerns would be welcome!
export const DashboardSidebarCollapseButton: FunctionComponent<DashboardSidebarCollapseButtonProps> = ({ isCollapsed, setIsCollapsed }) => {
  const sidebarCollapseBtnIconClassList = isCollapsed ? btnIconIsActiveClassList : btnIconIsNotActiveClassList;
  const sidebarCollapseBtnWrapperClassList = !isCollapsed ? btnWrapperIsActiveClassList : btnWrapperIsNotActiveClassList;
  const sidebarCollapseBtnClassList =
    'relative m-auto w-8 h-8 bg-black bottom-1 rounded-full rounded-b-full rounded-t-none lg:bottom-0 lg:rounded-r-full lg:rounded-l-none lg:right-2 rtl:lg:-right-2 rtl:lg:rounded-l-full rtl:lg:rounded-r-none';

  return (
    <div onClick={() => setIsCollapsed(!isCollapsed)} className={sidebarCollapseBtnWrapperClassList}>
      <button className={sidebarCollapseBtnClassList + ' ' + 'hidden lg:inline'}>
        <ArrowSmallRightIcon width={SIZE_PX_VALUE} height={SIZE_PX_VALUE} className={sidebarCollapseBtnIconClassList} />
      </button>

      <button className={sidebarCollapseBtnClassList + ' ' + 'lg:hidden'}>
        <ArrowSmallDownIcon width={SIZE_PX_VALUE} height={SIZE_PX_VALUE} className={sidebarCollapseBtnIconClassList} />
      </button>
    </div>
  );
};

export default DashboardSidebarCollapseButton;
