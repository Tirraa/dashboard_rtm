import IButtonStyleReactIcon from '@/components/config/styles/types/IButtonStyleReactIcon';

const COMMONS = 'transition-colors duration-200 p-2.5 rounded-lg';

export const SidebarButtonStyle: IButtonStyleReactIcon = {
  isActiveClassList: COMMONS + ' ' + 'text-white bg-slate-600',
  isNotActiveClassList: COMMONS + ' ' + 'text-gray-300 bg-slate-800',
  sidebarIconProps: { size: 20 }
} as const;

export default SidebarButtonStyle;
