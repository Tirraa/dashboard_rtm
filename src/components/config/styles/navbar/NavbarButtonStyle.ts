import BUTTON_CONFIG from '@/components/config/styles/buttons';
import type IButtonStyleBase from '@/components/config/styles/types/IButtonStyleBase';
import { cn } from '@/lib/tailwind';

export const COMMONS = 'transition-colors duration-200 flex flex-1 justify-center rounded-md px-3 py-2 font-medium';

const { NOT_ACTIVE_CLASSNAME, ACTIVE_CLASSNAME } = BUTTON_CONFIG;

export const NavbarButtonStyle: IButtonStyleBase = {
  isActiveClassList: cn(COMMONS, ACTIVE_CLASSNAME),
  isNotActiveClassList: cn(COMMONS, NOT_ACTIVE_CLASSNAME)
} as const;

export default NavbarButtonStyle;
