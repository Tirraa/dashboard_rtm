import type IButtonStyleBase from '@/components/config/styles/types/IButtonStyleBase';
import { cn } from '@/lib/tailwind';

const COMMONS = 'transition-colors duration-200 flex flex-1 justify-center rounded-md px-3 py-2 font-medium cursor-pointer';

export const NavbarButtonStyle: IButtonStyleBase = {
  isActiveClassList: cn(COMMONS, 'bg-slate-800 text-white'),
  isNotActiveClassList: cn(COMMONS, 'text-gray-600 hover:bg-slate-900 hover:text-white dark:text-gray-300 lg:text-gray-300')
} as const;

export default NavbarButtonStyle;
