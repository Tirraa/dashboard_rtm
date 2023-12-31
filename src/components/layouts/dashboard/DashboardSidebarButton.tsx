/* v8 ignore start */
// Stryker disable all
import type { FunctionComponent, ComponentType } from 'react';
import type { IconBaseProps } from 'react-icons';

import SidebarButtonStyle from '@/components/config/styles/sidebar/SidebarButtonStyle';

interface DashboardSidebarButtonProps {
  __SidebarIcon: ComponentType<IconBaseProps>;
}

const { sidebarIconProps } = SidebarButtonStyle;
const ICON_PROPS = { ...sidebarIconProps };

const DashboardSidebarButton: FunctionComponent<DashboardSidebarButtonProps> = ({ __SidebarIcon }) => {
  const pSize = ICON_PROPS.size;
  const size = typeof pSize === 'number' ? pSize : typeof pSize === 'string' ? parseFloat(pSize) : null;
  const sizeInPx = size ? size + 'px' : null;

  return <__SidebarIcon {...ICON_PROPS} style={sizeInPx !== null ? { height: sizeInPx, width: sizeInPx } : undefined} />;
};

export default DashboardSidebarButton;
// Stryker restore all
/* v8 ignore stop */
