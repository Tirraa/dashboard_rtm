import IButtonStyleReactIcon from './_types/IButtonStyleReactIcon';

const COMMONS = 'transition-colors p-2.5 rounded-lg';

export const SidebarButtonStyle: IButtonStyleReactIcon = {
  isActiveClassList: COMMONS + ' ' + 'bg-purple-800',
  isNotActiveClassList: COMMONS + ' ' + 'bg-purple-400',
  sidebarIconProps: { size: 20, color: 'white' }
};

export default SidebarButtonStyle;
