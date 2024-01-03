/* v8 ignore start */
// Stryker disable all
import type IButtonStyleReactIcon from '@/components/config/styles/types/IButtonStyleReactIcon';

import BUTTON_CONFIG from '@/components/config/styles/buttons';
import { cn } from '@/lib/tailwind';

const COMMONS = 'transition-colors duration-200 p-2.5 rounded-lg';
const { NOT_ACTIVE_CLASSNAME, ACTIVE_CLASSNAME } = BUTTON_CONFIG;

const SidebarButtonStyle: IButtonStyleReactIcon = {
  isNotActiveClassList: cn(COMMONS, NOT_ACTIVE_CLASSNAME),
  isActiveClassList: cn(COMMONS, ACTIVE_CLASSNAME),
  sidebarIconProps: { size: 25 }
} as const;

export default SidebarButtonStyle;
// Stryker restore all
/* v8 ignore stop */
