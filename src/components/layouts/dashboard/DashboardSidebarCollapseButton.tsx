'use client';

import SitebarDropdownButtonIconStyle from '@/components/config/styles/SitebarDropdownButtonIconStyle';
import SitebarDropdownButtonWrapperStyle from '@/components/config/styles/SitebarDropdownButtonWrapperStyle';
import { ArrowSmallRightIcon, ArrowSmallUpIcon } from '@heroicons/react/20/solid';
import { FunctionComponent } from 'react';

interface DashboardSidebarCollapseButtonProps {
  isCollapsed: boolean;
  setIsCollapsed: Function;
}

const { isActiveClassList: btnIconIsActiveClassList, isNotActiveClassList: btnIconIsNotActiveClassList } = SitebarDropdownButtonIconStyle;

const { isActiveClassList: btnWrapperIsActiveClassList, isNotActiveClassList: btnWrapperIsNotActiveClassList } = SitebarDropdownButtonWrapperStyle;

// {ToDo} Some sr-only elements/aria-labels for accessibility concerns would be welcome!
export const DashboardSidebarCollapseButton: FunctionComponent<DashboardSidebarCollapseButtonProps> = ({ isCollapsed, setIsCollapsed }) => {
  const sitebarDropdownBtnIconClassList = isCollapsed ? btnIconIsActiveClassList : btnIconIsNotActiveClassList;
  const sitebarDropdownBtnWrapperClassList = !isCollapsed ? btnWrapperIsActiveClassList : btnWrapperIsNotActiveClassList;
  const sitebarDropdownBtnClassList =
    'relative m-auto w-8 h-8 bg-black bottom-1 rounded-full rounded-b-full rounded-t-none lg:bottom-0 lg:rounded-r-full lg:rounded-l-none lg:right-2 rtl:lg:-right-2 rtl:lg:rounded-l-full rtl:lg:rounded-r-none';

  return (
    <div onClick={() => setIsCollapsed(!isCollapsed)} className={sitebarDropdownBtnWrapperClassList}>
      <button className={sitebarDropdownBtnClassList + ' ' + 'hidden lg:block'}>
        <ArrowSmallRightIcon width={20} height={20} className={sitebarDropdownBtnIconClassList} />
      </button>

      <button className={sitebarDropdownBtnClassList + ' ' + 'lg:hidden'}>
        <ArrowSmallUpIcon width={20} height={20} className={sitebarDropdownBtnIconClassList} />
      </button>
    </div>
  );
};

export default DashboardSidebarCollapseButton;
