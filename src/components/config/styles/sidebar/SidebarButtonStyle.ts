import BUTTON_CONFIG from '@/components/config/styles/buttons';
import type IButtonStyleReactIcon from '@/components/config/styles/types/IButtonStyleReactIcon';
import { cn } from '@/lib/tailwind';

const COMMONS = 'transition-colors duration-200 p-2.5 rounded-lg';
const { NOT_ACTIVE_CLASSNAME, ACTIVE_CLASSNAME } = BUTTON_CONFIG;

export const SidebarButtonStyle: IButtonStyleReactIcon = {
  isActiveClassList: cn(COMMONS, ACTIVE_CLASSNAME),
  isNotActiveClassList: cn(COMMONS, NOT_ACTIVE_CLASSNAME),
  sidebarIconProps: { size: 22 }
} as const;

export default SidebarButtonStyle;
