import IButtonStyleBase from './_types/IButtonStyleBase';

const commons = 'rounded-md px-3 py-2 text-sm font-medium';
export const NavbarButtonStyle: IButtonStyleBase = {
  isActiveClassList: commons + ' ' + 'bg-gray-900 text-white',
  isNotActiveClassList: commons + ' ' + 'text-gray-300 hover:bg-gray-700 hover:text-white'
};

export default NavbarButtonStyle;
