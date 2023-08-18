import IButtonStyleReactIcon from './_types/IButtonStyleReactIcon';

const commons = 'transition-all text-white my-4 p-3 rounded-lg inline-block';
export const SidebarButtonStyle: IButtonStyleReactIcon = {
  isActiveClassList: commons + ' ' + 'bg-purple-800',
  isNotActiveClassList: commons + ' ' + 'bg-purple-400',
  sidebarIconProps: { size: 20 }
};

export default SidebarButtonStyle;
