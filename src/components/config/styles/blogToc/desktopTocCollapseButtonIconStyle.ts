/* v8 ignore start */
// Stryker disable all

import type IButtonStyleBase from '@/components/config/styles/types/IButtonStyleBase';

import cn from '@/lib/portable/tailwind/cn';

const COMMONS = 'transition-transform duration-1000 m-auto w-[25px] h-[25px] p-1 text-primary-foreground lg:rtl:-scale-x-100';

const DesktopBlogTocCollapseButtonIconStyle: IButtonStyleBase = {
  isNotActiveClassList: cn(COMMONS, 'relative bottom-[2px] -rotate-180 lg:rtl:rotate-180'),
  isActiveClassList: COMMONS
} as const;

export default DesktopBlogTocCollapseButtonIconStyle;

// Stryker restore all
/* v8 ignore stop */
