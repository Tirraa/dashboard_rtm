import SidebarButtonStyle from '@/components/config/styles/SidebarButtonStyle';
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

  const pSize = SidebarButtonStyle.sidebarIconProps.size;
  const size = typeof pSize === 'number' ? pSize * 2 : typeof pSize === 'string' ? parseFloat(pSize) : null;

  return <__SidebarIcon {...ICON_PROPS} {...classList} style={size !== null ? { width: size + 'px', height: size + 'px' } : {}} />;
};

export default DashboardSidebarButton;
