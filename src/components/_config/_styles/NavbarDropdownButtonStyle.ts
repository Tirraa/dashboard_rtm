import IButtonStyleBase from './_types/IButtonStyleBase';

const ANIMATION_START_Y_DELTA_PX_VALUE = 15;
const COMMONS = 'transition-colors flex flex-1 justify-center rounded-md px-3 py-2 font-medium cursor-pointer';

export const NavbarDropdownButtonStyle: IButtonStyleBase = {
  isActiveClassList: COMMONS + ' ' + 'bg-gray-900 text-white',
  isNotActiveClassList: COMMONS + ' ' + 'text-gray-300 hover:bg-gray-900 hover:text-white'
};

export const navbarDropdownComponentProps = {
  animate: {
    mount: { y: 0 },
    unmount: { y: ANIMATION_START_Y_DELTA_PX_VALUE }
  },
  allowHover: true
};

export const NAVBAR_DROPDOWN_INNER_BUTTONS_CLASSLIST = 'flex items-center h-full px-4 py-2.5';

export default NavbarDropdownButtonStyle;
