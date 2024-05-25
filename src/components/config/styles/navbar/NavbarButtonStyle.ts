/* v8 ignore start */
// Stryker disable all

import type IButtonStyleBase from '@/components/config/styles/types/IButtonStyleBase';

import BUTTON_CONFIG from '@/components/config/styles/buttons';
import cn from '@/lib/portable/tailwind/cn';

export const COMMONS = 'transition-colors duration-200 flex h-fit flex-1 break-word items-center justify-center rounded-md px-3 py-2 font-semibold';

const { NOT_ACTIVE_CLASSNAME, ACTIVE_CLASSNAME } = BUTTON_CONFIG;

const NavbarButtonStyle: IButtonStyleBase = {
  isNotActiveClassList: cn(COMMONS, NOT_ACTIVE_CLASSNAME),
  isActiveClassList: cn(COMMONS, ACTIVE_CLASSNAME)
} as const;

export default NavbarButtonStyle;

// Stryker restore all
/* v8 ignore stop */
