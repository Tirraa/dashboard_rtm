import DashboardSidebarDynamicRenderingConfig from '@/config/DashboardSidebar/dynamicRenderingConfig';
import IButtonStyleReactIcon from './_types/IButtonStyleReactIcon';

const COMMONS = 'flex max-w-full text-white w-fit p-3 rounded-lg';

export const SidebarButtonStyle: IButtonStyleReactIcon = {
  isActiveClassList: COMMONS + ' ' + 'bg-purple-800',
  isNotActiveClassList: COMMONS + ' ' + 'bg-purple-400',
  sidebarIconProps: { size: DashboardSidebarDynamicRenderingConfig.SIDEBAR_ICON_SIZE_PX_VALUE }
};

export default SidebarButtonStyle;
