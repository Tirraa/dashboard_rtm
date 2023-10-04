'use client';

import SitebarDropdownButtonIconStyle from '@/components/config/styles/SitebarDropdownButtonIconStyle';
import SitebarDropdownButtonStyle from '@/components/config/styles/SitebarDropdownButtonStyle';
import { ArrowSmallDownIcon, ArrowSmallLeftIcon, ArrowSmallRightIcon, ArrowSmallUpIcon } from '@heroicons/react/20/solid';
import { FunctionComponent } from 'react';

interface DashboardSidebarCollapseButtonProps {
  isCollapsed: boolean;
  setIsCollapsed: Function;
}

const { isActiveClassList: btnIconIsActiveClassList, isNotActiveClassList: btnIconIsNotActiveClassList } = SitebarDropdownButtonIconStyle;

const { isActiveClassList: btnIsActiveClassList, isNotActiveClassList: btnIsNotActiveClassList } = SitebarDropdownButtonStyle;

// {ToDo} Some sr-only elements/aria-labels for accessibility concerns would be welcome!
// {ToDo} Animate this (use 'rotate' instead of using one icon for each 'isCollapsed' case)
// {ToDo} Bugfix when dir="rtl"
export const DashboardSidebarCollapseButton: FunctionComponent<DashboardSidebarCollapseButtonProps> = ({ isCollapsed, setIsCollapsed }) => {
  const sitebarDropdownBtnIconClassList = isCollapsed ? btnIconIsActiveClassList : btnIconIsNotActiveClassList;
  const sitebarDropdownBtnClassList = !isCollapsed ? btnIsActiveClassList : btnIsNotActiveClassList;

  return (
    <div onClick={() => setIsCollapsed(!isCollapsed)} className={sitebarDropdownBtnClassList}>
      <button className="hidden lg:block m-auto">
        {isCollapsed ? (
          <ArrowSmallRightIcon width={20} height={20} className={sitebarDropdownBtnIconClassList} />
        ) : (
          <ArrowSmallLeftIcon width={20} height={20} className={sitebarDropdownBtnIconClassList} />
        )}
      </button>

      <button className="block lg:hidden m-auto">
        {isCollapsed ? (
          <ArrowSmallDownIcon width={20} height={20} className={sitebarDropdownBtnIconClassList} />
        ) : (
          <ArrowSmallUpIcon width={20} height={20} className={sitebarDropdownBtnIconClassList} />
        )}
      </button>
    </div>
  );
};

export default DashboardSidebarCollapseButton;
