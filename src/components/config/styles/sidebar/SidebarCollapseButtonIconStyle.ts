import IButtonStyleBase from '@/components/config/styles/types/IButtonStyleBase';
import { cn } from '@/lib/tailwind';

const COMMONS = 'transition-transform	duration-700 m-auto w-full h-full p-1 text-white lg:rtl:-scale-x-100';

export const SidebarCollapseButtonIconStyle: IButtonStyleBase = {
  isActiveClassList: COMMONS,
  isNotActiveClassList: cn(COMMONS, '-rotate-180 lg:rtl:rotate-180')
} as const;

export const SIZE_PX_VALUE = 20;

export default SidebarCollapseButtonIconStyle;
