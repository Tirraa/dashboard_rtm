import { AppPath } from '@/types/Next';
import { ClassName } from '@/types/React';
import { NextFont } from 'next/dist/compiled/@next/font';
import { redirect } from 'next/navigation';
import { getAppPathParentPath, sanitizePathname } from './str';

export const fCls = (f: NextFont): ClassName => ({ className: f.className });
export const fClStr = (f: NextFont): string => f.className;

export const redirectToParentPath = (pathname: AppPath, unsafeCtx: boolean = false): void =>
  redirect(getAppPathParentPath(unsafeCtx ? sanitizePathname(pathname) : pathname));

export const serverCtx = () => typeof window === 'undefined' || typeof document === 'undefined';
