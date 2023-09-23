import { ClassName } from '@/types/React';
import { NextFont } from 'next/dist/compiled/@next/font';

export const fCls = (f: NextFont): ClassName => ({ className: f.className });
export const fClStr = (f: NextFont): string => f.className;

export const serverCtx = () => typeof window === 'undefined' || typeof document === 'undefined';
