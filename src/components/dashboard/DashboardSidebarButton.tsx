import SidebarButtonStyle from '@/components/_config/_styles/SidebarButtonStyle';
import ROUTES_ROOTS from '@/config/routes';
import { hrefMatchesPathname } from '@/lib/str';
import { AppPath } from '@/types/Next';
import { ClassName } from '@/types/React';
import { usePathname } from 'next/navigation';
import { ComponentType, FunctionComponent } from 'react';
import { IconBaseProps } from 'react-icons';

interface DashboardSidebarButtonProps {
  href: AppPath;
  __SidebarIcon: ComponentType<IconBaseProps>;
}

const { isActiveClassList, isNotActiveClassList, sidebarIconProps } = SidebarButtonStyle;
const ACTIVE: ClassName = { className: isActiveClassList };
const INACTIVE: ClassName = { className: isNotActiveClassList };
const ICON_PROPS = { ...sidebarIconProps };

export const DashboardSidebarButton: FunctionComponent<DashboardSidebarButtonProps> = ({ __SidebarIcon, href }) => {
  const currentPathname = usePathname();
  const classList = hrefMatchesPathname(href, currentPathname, ROUTES_ROOTS.DASHBOARD) ? ACTIVE : INACTIVE;

  return (
    <div {...classList}>
      <__SidebarIcon {...ICON_PROPS} />
    </div>
  );
};

export default DashboardSidebarButton;
