import config from 'tailwind.config';
import type { TailwindScreensBreakpoint } from '../../../types/Tailwind';
const getScreens = () => config.theme.screens;

export const getBreakpoint = (breakpoint: TailwindScreensBreakpoint): number => parseInt(getScreens()[breakpoint]);

export default getBreakpoint;
