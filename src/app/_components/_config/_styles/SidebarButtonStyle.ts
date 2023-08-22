import IButtonStyleReactIcon from './_types/IButtonStyleReactIcon';

export const sidebarIconSizeInPx = 20;
const commons = 'transition-all text-white my-4 p-3 rounded-lg inline-block';

export const SidebarButtonStyle: IButtonStyleReactIcon = {
  isActiveClassList: commons + ' ' + 'bg-purple-800',
  isNotActiveClassList: commons + ' ' + 'bg-purple-400',
  sidebarIconProps: { size: sidebarIconSizeInPx }
};

export default SidebarButtonStyle;
