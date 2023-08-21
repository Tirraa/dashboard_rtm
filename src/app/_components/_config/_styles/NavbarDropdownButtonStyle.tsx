import IButtonStyleBase from './_types/IButtonStyleBase';

const commons = 'transition-all flex flex-1 justify-center rounded-md px-3 py-2 font-medium cursor-pointer';
export const NavbarDropdownButtonStyle: IButtonStyleBase = {
  isActiveClassList: commons + ' ' + 'bg-gray-900 text-white',
  isNotActiveClassList: commons + ' ' + 'text-gray-300 hover:bg-gray-900 hover:text-white'
};

export const navbarDropdownComponentProps = {
  animate: {
    mount: { y: 0 },
    unmount: { y: 15 }
  },
  allowHover: true
};

export const navbarDropdownInnerButtonsClassList = 'flex items-center h-full px-4 py-2.5';

export default NavbarDropdownButtonStyle;