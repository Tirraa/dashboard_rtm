import IButtonStyleBase from '@/components/config/styles/types/IButtonStyleBase';

const COMMONS = 'transition-transform relative top-1 ml-1 h-5 w-5';

export const NavbarDropdownButtonIconStyle: IButtonStyleBase = {
  isActiveClassList: COMMONS + ' ' + '-rotate-180 rtl:rotate-180',
  isNotActiveClassList: COMMONS
} as const;

export default NavbarDropdownButtonIconStyle;
