import SidebarButtonStyle from '@/components/_config/_styles/SidebarButtonStyle';
import { hrefMatchesPathname } from '@/lib/str';
import { usePathname } from 'next/navigation';
import { ComponentType, FunctionComponent } from 'react';
import { IconBaseProps } from 'react-icons';

interface SidebarButtonProps {
  href: string;
  __SidebarIcon: ComponentType<IconBaseProps>;
}

const { isActiveClassList, isNotActiveClassList, sidebarIconProps } = SidebarButtonStyle;
const active = { className: isActiveClassList };
const inactive = { className: isNotActiveClassList };
const iconProps = { ...sidebarIconProps };

const SidebarButton: FunctionComponent<SidebarButtonProps> = ({ __SidebarIcon, href }) => {
  const currentPathname = usePathname();
  const classList = hrefMatchesPathname(href, currentPathname) ? active : inactive;

  return (
    <div {...classList}>
      <__SidebarIcon {...iconProps} />
    </div>
  );
};

export default SidebarButton;
