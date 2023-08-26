import { ClassName } from '@/types/React';
import { NextFont } from 'next/dist/compiled/@next/font';

export function fCls(f: NextFont): ClassName {
  return { className: f.className };
}

export function fClStr(f: NextFont): string {
  return f.className;
}
