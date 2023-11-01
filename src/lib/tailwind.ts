import type { TailwindScreensBreakpoint } from '@/types/Tailwind';
import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import config from 'tailwind.config';

const getScreens = () => config.theme.screens;

export const getBreakpoint = (breakpoint: TailwindScreensBreakpoint): number => parseInt(getScreens()[breakpoint]);

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
