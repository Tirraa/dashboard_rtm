import { TailwindScreensBreakpoint } from '@/types/Tailwind';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import config from 'tailwind.config';

const getScreens = () => config.theme.screens;

export const getBreakpoint = (breakpoint: TailwindScreensBreakpoint): number => parseInt(getScreens()[breakpoint]);

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
