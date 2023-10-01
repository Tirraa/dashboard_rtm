import IButtonStyleReactIcon from './types/IButtonStyleReactIcon';

const COMMONS = 'transition-colors duration-200 p-2.5 rounded-lg';

export const SidebarButtonStyle: IButtonStyleReactIcon = {
  isActiveClassList: COMMONS + ' ' + 'bg-purple-800',
  isNotActiveClassList: COMMONS + ' ' + 'bg-purple-400',
  sidebarIconProps: { size: 20, color: 'white' }
};

export default SidebarButtonStyle;
