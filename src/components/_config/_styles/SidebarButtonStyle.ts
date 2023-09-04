import DashboardSidebarDynamicRenderingConfig from '@/config/DashboardSidebar/dynamicRenderingConfig';
import IButtonStyleReactIcon from './_types/IButtonStyleReactIcon';

const COMMONS = 'transition-all text-white flex w-fit p-3 rounded-lg inline-block';

export const SidebarButtonStyle: IButtonStyleReactIcon = {
  isActiveClassList: COMMONS + ' ' + 'bg-purple-800',
  isNotActiveClassList: COMMONS + ' ' + 'bg-purple-400',
  sidebarIconProps: { size: DashboardSidebarDynamicRenderingConfig.SIDEBAR_ICON_SIZE_PX_VALUE }
};

export default SidebarButtonStyle;
