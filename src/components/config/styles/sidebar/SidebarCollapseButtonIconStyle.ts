/* v8 ignore start */
// Stryker disable all

import type IButtonStyleBase from '@/components/config/styles/types/IButtonStyleBase';

import { cn } from '@/lib/tailwind';

const COMMONS = 'transition-transform duration-1000 m-auto p-1 text-primary-foreground lg:rtl:-scale-x-100 w-[25px] h-[25px]';

const SidebarCollapseButtonIconStyle: IButtonStyleBase = {
  isNotActiveClassList: cn(COMMONS, '-rotate-180 lg:rtl:rotate-180'),
  isActiveClassList: COMMONS
} as const;

export default SidebarCollapseButtonIconStyle;

// Stryker restore all
/* v8 ignore stop */
