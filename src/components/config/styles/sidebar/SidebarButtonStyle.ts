import IButtonStyleReactIcon from '@/components/config/styles/types/IButtonStyleReactIcon';

const COMMONS = 'transition-colors duration-200 p-2.5 rounded-lg text-white';

export const SidebarButtonStyle: IButtonStyleReactIcon = {
  isActiveClassList: COMMONS + ' ' + 'bg-purple-800 dark:text-white dark:bg-slate-600',
  isNotActiveClassList: COMMONS + ' ' + 'bg-purple-400 dark:text-gray-300 dark:bg-slate-800',
  sidebarIconProps: { size: 20 }
};

export default SidebarButtonStyle;
