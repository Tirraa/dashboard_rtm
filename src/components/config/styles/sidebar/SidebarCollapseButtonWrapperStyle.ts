/* v8 ignore start */
import type IButtonStyleBase from '@/components/config/styles/types/IButtonStyleBase';

import { cn } from '@/lib/tailwind';

const COMMONS = 'z-10 transition-opacity delay-300 duration-1000 relative h-0 flex lg:w-0 lg:block';

const SidebarCollapseButtonWrapperStyle: IButtonStyleBase = {
  isNotActiveClassList: cn(COMMONS, 'opacity-20 hover:opacity-100 hover:delay-0 hover:duration-300'),
  isActiveClassList: cn(COMMONS, 'opacity-100')
} as const;

export default SidebarCollapseButtonWrapperStyle;
/* v8 ignore stop */
