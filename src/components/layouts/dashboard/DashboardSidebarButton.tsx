import SidebarButtonStyle from '@/components/config/styles/sidebar/SidebarButtonStyle';
import ROUTES_ROOTS from '@/config/routes';
import { hrefMatchesPathname } from '@/lib/str';
import { AppPath } from '@/types/Next';
import { usePathname } from 'next/navigation';
import { ComponentType, FunctionComponent } from 'react';
import { IconBaseProps } from 'react-icons';

interface DashboardSidebarButtonProps {
  href: AppPath;
  __SidebarIcon: ComponentType<IconBaseProps>;
}

const { isActiveClassList, isNotActiveClassList, sidebarIconProps } = SidebarButtonStyle;
const ICON_PROPS = { ...sidebarIconProps };

export const DashboardSidebarButton: FunctionComponent<DashboardSidebarButtonProps> = ({ __SidebarIcon, href }) => {
  const currentPathname = usePathname();
  const className = hrefMatchesPathname(href, currentPathname, ROUTES_ROOTS.DASHBOARD) ? isActiveClassList : isNotActiveClassList;

  const pSize = SidebarButtonStyle.sidebarIconProps.size;
  const size = typeof pSize === 'number' ? pSize * 2 : typeof pSize === 'string' ? parseFloat(pSize) : null;

  return <__SidebarIcon {...ICON_PROPS} {...{ className }} style={size !== null ? { width: size + 'px', height: size + 'px' } : {}} />;
};

export default DashboardSidebarButton;
