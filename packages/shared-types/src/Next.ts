/* v8 ignore start */
// Stryker disable all
import type { NextMiddleware } from 'next/server';
import type { ReactNode } from 'react';

import type { ClassName } from './React';

export type AppPath = string;
export type PathSegment = string;
export type AppPathAsIs = AppPath;

export type WithChildren = { children: ReactNode };
export interface LayoutMinimalProps extends WithChildren {}

export interface WithClassname extends ClassName {}

export type WithDeepResetOnLgBreakpointEvents = { withDeepResetOnLgBreakpointEvents: boolean };

export interface WithIsMobile {
  isMobile?: boolean;
}

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;
// Stryker restore all
/* v8 ignore stop */
