import SidebarButtonStyle from '@/components/_config/_styles/SidebarButtonStyle';
import { hrefMatchesPathname } from '@/lib/str';
import { usePathname } from 'next/navigation';
import { ComponentType, FunctionComponent } from 'react';
import { IconBaseProps } from 'react-icons';

interface DashboardSidebarButtonProps {
  href: string;
  __SidebarIcon: ComponentType<IconBaseProps>;
}

const { isActiveClassList, isNotActiveClassList, sidebarIconProps } = SidebarButtonStyle;
const active = { className: isActiveClassList };
const inactive = { className: isNotActiveClassList };
const iconProps = { ...sidebarIconProps };

export const DashboardSidebarButton: FunctionComponent<DashboardSidebarButtonProps> = ({ __SidebarIcon, href }) => {
  const currentPathname = usePathname();
  const classList = hrefMatchesPathname(href, currentPathname) ? active : inactive;

  return (
    <div {...classList}>
      <__SidebarIcon {...iconProps} />
    </div>
  );
};

export default DashboardSidebarButton;
