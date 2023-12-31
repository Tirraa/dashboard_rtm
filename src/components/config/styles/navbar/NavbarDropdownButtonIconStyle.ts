/* v8 ignore start */
// Stryker disable all
import type IButtonStyleBase from '@/components/config/styles/types/IButtonStyleBase';

import { cn } from '@/lib/tailwind';

const COMMONS = 'transition-transform relative top-[3px] ml-1 h-5 w-5';

const NavbarDropdownButtonIconStyle: IButtonStyleBase = {
  isActiveClassList: cn(COMMONS, '-rotate-180 rtl:rotate-180'),
  isNotActiveClassList: COMMONS
} as const;

export default NavbarDropdownButtonIconStyle;
// Stryker restore all
/* v8 ignore stop */
