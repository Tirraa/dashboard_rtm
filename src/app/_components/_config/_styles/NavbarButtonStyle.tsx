import IButtonStyleBase from './_types/IButtonStyleBase';

const responsive = 'lg:w-auto lg:text-left';
const commons = 'w-full block text-center rounded-md px-3 py-2 font-medium' + ' ' + responsive;
export const NavbarButtonStyle: IButtonStyleBase = {
  isActiveClassList: commons + ' ' + 'bg-gray-900 text-white',
  isNotActiveClassList: commons + ' ' + 'text-gray-300 hover:bg-gray-700 hover:text-white'
};

export default NavbarButtonStyle;
