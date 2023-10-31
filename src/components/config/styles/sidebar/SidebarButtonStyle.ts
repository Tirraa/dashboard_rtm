import IButtonStyleReactIcon from '@/components/config/styles/types/IButtonStyleReactIcon';
import { cn } from '@/lib/tailwind';

const COMMONS = 'transition-colors duration-200 p-2.5 rounded-lg';

export const SidebarButtonStyle: IButtonStyleReactIcon = {
  isActiveClassList: cn(COMMONS, 'bg-slate-600 text-white'),
  isNotActiveClassList: cn(COMMONS, 'bg-slate-800 text-gray-300'),
  sidebarIconProps: { size: 22 }
} as const;

export default SidebarButtonStyle;
