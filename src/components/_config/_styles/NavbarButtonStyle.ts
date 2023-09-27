import IButtonStyleBase from './_types/IButtonStyleBase';

const COMMONS = 'transition-colors duration-200 flex flex-1 justify-center rounded-md px-3 py-2 font-medium cursor-pointer';

export const NavbarButtonStyle: IButtonStyleBase = {
  isActiveClassList: COMMONS + ' ' + 'bg-gray-900 text-white',
  isNotActiveClassList: COMMONS + ' ' + 'text-gray-300 hover:bg-gray-700 hover:text-white'
};

export default NavbarButtonStyle;
