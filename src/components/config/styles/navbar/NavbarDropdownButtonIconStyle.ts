/* v8 ignore start */
// Stryker disable all

import type IButtonStyleBase from '@/components/config/styles/types/IButtonStyleBase';

import { cn } from '@/lib/tailwind';

const COMMONS = 'transition-transform relative ml-[2px] h-5 w-5';

const NavbarDropdownButtonIconStyle: IButtonStyleBase = {
  isActiveClassList: cn(COMMONS, 'top-[2px] -rotate-180 rtl:rotate-180'),
  isNotActiveClassList: cn(COMMONS, 'top-[1.45px]')
} as const;

export default NavbarDropdownButtonIconStyle;

// Stryker restore all
/* v8 ignore stop */
