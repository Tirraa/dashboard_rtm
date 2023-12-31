/* v8 ignore start */
// Stryker disable all
import type IButtonStyleBase from '@/components/config/styles/types/IButtonStyleBase';

import { COMMONS } from '@/components/config/styles/navbar/NavbarButtonStyle';
import BUTTON_CONFIG from '@/components/config/styles/buttons';
import { cn } from '@/lib/tailwind';

const { NOT_ACTIVE_CLASSNAME, ACTIVE_CLASSNAME } = BUTTON_CONFIG;

const NavbarDropdownMenuButtonStyle: IButtonStyleBase = {
  isNotActiveClassList: cn(COMMONS, NOT_ACTIVE_CLASSNAME),
  isActiveClassList: cn(COMMONS, ACTIVE_CLASSNAME)
} as const;

export const NAVBAR_DROPDOWN_MENU_INNER_BUTTONS_CLASSLIST = 'flex items-center h-full px-4 py-2.5';

export default NavbarDropdownMenuButtonStyle;
/* v8 ignore stop */
// Stryker restore all
