'use client';

import SitebarDropdownButtonStyle from '@/components/config/styles/SitebarDropdownButtonStyle';
import { ArrowSmallDownIcon, ArrowSmallLeftIcon, ArrowSmallRightIcon, ArrowSmallUpIcon } from '@heroicons/react/20/solid';
import { FunctionComponent } from 'react';

interface DashboardSidebarCollapseButtonProps {
  isCollapsed: boolean;
  setIsCollapsed: Function;
}

const { isActiveClassList, isNotActiveClassList } = SitebarDropdownButtonStyle;

// {ToDo} Some sr-only elements/aria-labels for accessibility concerns would be welcome!
// {ToDo} Animate this (use 'rotate' instead of using one icon for each 'isCollapsed' case)
// {ToDo} Bugfix when dir="rtl"
export const DashboardSidebarCollapseButton: FunctionComponent<DashboardSidebarCollapseButtonProps> = ({ isCollapsed, setIsCollapsed }) => {
  const sitebarDropdownBtnClassList = !isCollapsed ? isNotActiveClassList : isActiveClassList;

  return (
    <div onClick={() => setIsCollapsed(!isCollapsed)}>
      <button className="hidden lg:block m-auto">
        {isCollapsed ? (
          <ArrowSmallRightIcon width={20} height={20} className={sitebarDropdownBtnClassList} />
        ) : (
          <ArrowSmallLeftIcon width={20} height={20} className={sitebarDropdownBtnClassList} />
        )}
      </button>

      <button className="block lg:hidden m-auto">
        {isCollapsed ? (
          <ArrowSmallDownIcon width={20} height={20} className={sitebarDropdownBtnClassList} />
        ) : (
          <ArrowSmallUpIcon width={20} height={20} className={sitebarDropdownBtnClassList} />
        )}
      </button>
    </div>
  );
};

export default DashboardSidebarCollapseButton;
