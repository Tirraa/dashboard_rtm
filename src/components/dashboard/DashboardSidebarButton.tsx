import SidebarButtonStyle from '@/components/_config/_styles/SidebarButtonStyle';
import RoutesBase from '@/config/routes';
import { hrefMatchesPathname } from '@/lib/str';
import { ClassName } from '@/types/React';
import { usePathname } from 'next/navigation';
import { ComponentType, FunctionComponent } from 'react';
import { IconBaseProps } from 'react-icons';

interface DashboardSidebarButtonProps {
  href: string;
  __SidebarIcon: ComponentType<IconBaseProps>;
}

const { isActiveClassList, isNotActiveClassList, sidebarIconProps } = SidebarButtonStyle;
const active: ClassName = { className: isActiveClassList };
const inactive: ClassName = { className: isNotActiveClassList };
const iconProps = { ...sidebarIconProps };

export const DashboardSidebarButton: FunctionComponent<DashboardSidebarButtonProps> = ({ __SidebarIcon, href }) => {
  const currentPathname = usePathname();
  const classList = hrefMatchesPathname(href, currentPathname, RoutesBase.dashboard) ? active : inactive;

  return (
    <div {...classList}>
      <__SidebarIcon {...iconProps} />
    </div>
  );
};

export default DashboardSidebarButton;
