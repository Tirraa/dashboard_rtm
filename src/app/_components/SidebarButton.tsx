import { usePathname } from 'next/navigation';
import { ComponentType, FunctionComponent } from 'react';
import { IconBaseProps } from 'react-icons';
import { hrefMatchesPathname } from '../_lib/hrefPathnameMatching';
import SidebarButtonStyle from './_config/_styles/SidebarButtonStyle';

interface SidebarButtonProps {
  href: string;
  __SidebarIcon: ComponentType<IconBaseProps>;
}

const active = { className: SidebarButtonStyle.isActiveClassList };
const inactive = { className: SidebarButtonStyle.isNotActiveClassList };
const iconProps = { ...SidebarButtonStyle.sidebarIconProps };

const SidebarButton: FunctionComponent<SidebarButtonProps> = ({ __SidebarIcon, href }) => {
  const currentPathname = usePathname();
  const activeStateClassList = hrefMatchesPathname(href, currentPathname) ? active : inactive;

  return (
    <div {...activeStateClassList}>
      <__SidebarIcon {...iconProps} />
    </div>
  );
};

export default SidebarButton;
