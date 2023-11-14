import type { TailwindScreensBreakpoint } from '@/types/Tailwind';
import config from 'tailwind.config';

const getScreens = () => config.theme.screens;

export const getBreakpoint = (breakpoint: TailwindScreensBreakpoint): number => parseInt(getScreens()[breakpoint]);

export default getBreakpoint;
