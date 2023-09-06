import { ClassName } from '@/types/React';
import { NextFont } from 'next/dist/compiled/@next/font';

type TNextCtx = {
  DEV: boolean;
  PROD: boolean;
};

const NODE_DEV_ENV = 'development';
const DEV = process.env.NODE_ENV === NODE_DEV_ENV;
export const NextCtx: TNextCtx = {
  DEV,
  PROD: !DEV
} as const;

export const fCls = (f: NextFont): ClassName => ({ className: f.className });
export const fClStr = (f: NextFont): string => f.className;
