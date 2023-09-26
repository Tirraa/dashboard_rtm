import IButtonStyleReactIcon from './_types/IButtonStyleReactIcon';

const COMMONS = 'flex max-w-full text-white w-fit p-3 rounded-lg';

export const SidebarButtonStyle: IButtonStyleReactIcon = {
  isActiveClassList: COMMONS + ' ' + 'bg-purple-800',
  isNotActiveClassList: COMMONS + ' ' + 'bg-purple-400',
  sidebarIconProps: { size: 20 }
};

export default SidebarButtonStyle;
