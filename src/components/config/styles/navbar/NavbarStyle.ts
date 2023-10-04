import { getBreakpoint } from '@/lib/tailwind';

type TNavbarStyle = {
  NAVBAR_DESKTOP_BREAKPOINT_PX_VALUE: number;
  LOGO_SIZE_PX_VALUE: number;
};

export const NAVBAR_STYLE: TNavbarStyle = {
  NAVBAR_DESKTOP_BREAKPOINT_PX_VALUE: getBreakpoint('lg') as number,
  LOGO_SIZE_PX_VALUE: 50
} as const;

export default NAVBAR_STYLE;
