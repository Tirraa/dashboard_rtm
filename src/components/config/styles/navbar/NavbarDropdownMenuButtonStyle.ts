import IButtonStyleBase from '@/components/config/styles/types/IButtonStyleBase';
import { cn } from '@/lib/tailwind';

const COMMONS = 'transition-colors duration-200 flex flex-1 justify-center rounded-md px-3 py-2 font-medium cursor-pointer';

export const NavbarDropdownMenuButtonStyle: IButtonStyleBase = {
  isActiveClassList: cn(COMMONS, 'bg-gray-900 text-white'),
  isNotActiveClassList: cn(COMMONS, 'text-gray-300 hover:bg-gray-900 hover:text-white')
} as const;

export const NAVBAR_DROPDOWN_MENU_INNER_BUTTONS_CLASSLIST = 'flex items-center h-full px-4 py-2.5';

export default NavbarDropdownMenuButtonStyle;
