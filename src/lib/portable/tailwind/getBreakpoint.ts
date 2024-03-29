import type { TailwindScreensBreakpoint } from '@/types/Tailwind';
import type { PxValue } from '@rtm/shared-types/Numbers';

import config from 'tailwind.config';

const getScreens = () => config.theme.screens;

const getBreakpoint = (breakpoint: TailwindScreensBreakpoint): PxValue => parseInt(getScreens()[breakpoint]);

export default getBreakpoint;
