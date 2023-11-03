import SidebarButtonStyle from '@/components/config/styles/sidebar/SidebarButtonStyle';
import type { ComponentType, FunctionComponent } from 'react';
import type { IconBaseProps } from 'react-icons';

interface DashboardSidebarButtonProps {
  __SidebarIcon: ComponentType<IconBaseProps>;
}

const { sidebarIconProps } = SidebarButtonStyle;
const ICON_PROPS = { ...sidebarIconProps };

export const DashboardSidebarButton: FunctionComponent<DashboardSidebarButtonProps> = ({ __SidebarIcon }) => {
  const pSize = ICON_PROPS.size;
  const size = typeof pSize === 'number' ? pSize : typeof pSize === 'string' ? parseFloat(pSize) : null;
  const sizeInPx = size ? size + 'px' : null;

  return <__SidebarIcon {...ICON_PROPS} style={sizeInPx !== null ? { width: sizeInPx, height: sizeInPx } : undefined} />;
};

export default DashboardSidebarButton;
