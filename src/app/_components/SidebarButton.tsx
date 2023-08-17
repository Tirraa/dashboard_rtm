import { usePathname } from 'next/navigation';
import { FunctionComponent } from 'react';
import { IconBaseProps } from 'react-icons';
import { hrefMatchesPathname } from '../_lib/hrefPathnameMatching';
import SidebarButtonStyle from './_config/_styles/SidebarButtonStyle';

interface SidebarButtonProps {
  href: string;
  __SidebarIcon: React.ComponentType<IconBaseProps>;
}

const active = { className: SidebarButtonStyle.isActiveClassList };
const inactive = { className: SidebarButtonStyle.isNotActiveClassList };
const iconProps = { ...SidebarButtonStyle.sidebarIconProps };

const SidebarButton: FunctionComponent<SidebarButtonProps> = ({ __SidebarIcon, href }) => {
  const currentPathname = usePathname();
  const activeStateCls = hrefMatchesPathname(href, currentPathname) ? active : inactive;

  return (
    <div {...activeStateCls}>
      <__SidebarIcon {...iconProps} />
    </div>
  );
};

export default SidebarButton;
