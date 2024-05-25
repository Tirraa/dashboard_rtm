/* v8 ignore start */
// Stryker disable all

import type IButtonStyleBase from '@/components/config/styles/types/IButtonStyleBase';

import cn from '@/lib/portable/tailwind/cn';

const COMMONS = 'z-10 transition-opacity delay-300 duration-1000 relative h-0 flex flex-col lg:w-0 lg:block';

const SidebarCollapseButtonWrapperStyle: IButtonStyleBase = {
  isNotActiveClassList: cn(COMMONS, 'opacity-20 hover:opacity-100 hover:delay-0 hover:duration-300'),
  isActiveClassList: cn(COMMONS, 'opacity-100')
} as const;

export default SidebarCollapseButtonWrapperStyle;

// Stryker restore all
/* v8 ignore stop */
