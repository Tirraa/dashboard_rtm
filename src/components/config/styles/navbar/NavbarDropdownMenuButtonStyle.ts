import IButtonStyleBase from '@/components/config/styles/types/IButtonStyleBase';

const ANIMATION_START_Y_DELTA_PX_VALUE = 15;
const COMMONS = 'transition-colors duration-200 flex flex-1 justify-center rounded-md px-3 py-2 font-medium cursor-pointer';

export const NavbarDropdownMenuButtonStyle: IButtonStyleBase = {
  isActiveClassList: COMMONS + ' ' + 'bg-gray-900 text-white',
  isNotActiveClassList: COMMONS + ' ' + 'text-gray-300 hover:bg-gray-900 hover:text-white'
} as const;

export const NAVBAR_DROPDOWN_MENU_BUTTON_COMPONENTS_PROPS = {
  animate: {
    mount: { y: 0 },
    unmount: { y: ANIMATION_START_Y_DELTA_PX_VALUE }
  },
  allowHover: true
} as const;

export const NAVBAR_DROPDOWN_MENU_INNER_BUTTONS_CLASSLIST = 'flex items-center h-full px-4 py-2.5';

export default NavbarDropdownMenuButtonStyle;
