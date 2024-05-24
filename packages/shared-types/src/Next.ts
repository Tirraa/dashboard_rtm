/* v8 ignore start */
// Stryker disable all

import type { NextMiddleware } from 'next/server';
import type { Session } from 'next-auth';
import type { ReactNode } from 'react';

import type { MaybeNull } from './CustomUtilityTypes';
import type LanguageFlag from './LanguageFlag';
import type { ClassName } from './React';

export type Path = string;
export type Href = string;
export type AppPath = string;
export type PathSegment = string;
export type AppPathAsIs = AppPath;

export type WithChildren = { children: ReactNode };
export interface LayoutMinimalProps extends WithChildren {}

export interface WithSession {
  session: MaybeNull<Session>;
}

export interface WithLanguage {
  language: LanguageFlag;
}

export interface WithClassname extends ClassName {}

export type WithDeepResetOnLgBreakpointEvents = { withDeepResetOnLgBreakpointEvents: boolean };

export interface WithIsMobile {
  isMobile?: boolean;
}

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

// Stryker restore all
/* v8 ignore stop */
