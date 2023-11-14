import type i18nTaxonomy from '##/config/taxonomies/i18n';
import type NotFoundTaxonomy from '##/config/taxonomies/notfound';
import type { LanguageFlag } from '##/types/hell/i18n';
import type { ClassName } from '@/types/React';
import type { NextMiddleware } from 'next/server';
import type { ReactNode } from 'react';

export type WithChildren = { children: ReactNode };
export interface LayoutMinimalProps extends WithChildren {}

export interface WithClassname extends ClassName {}

export type WithDeepResetOnLgBreakpointEvents = { withDeepResetOnLgBreakpointEvents: boolean };

export interface i18nParams {
  [i18nTaxonomy.LANG_FLAG]: LanguageFlag;
}

export interface i18nPageProps {
  params: i18nParams;
}

export interface i18nComponentProps {
  i18nProps: i18nParams;
}

export interface LayoutBaseProps extends i18nPageProps {
  children: ReactNode;
}

export interface WithIsMobile {
  isMobile?: boolean;
}

export type AppPath = string;
export type PathSegment = string;

export type AppPathAsIs = AppPath;

export type NotFoundCatchallParams = {
  params: { [NotFoundTaxonomy.NOT_FOUND]: unknown[] };
};

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;
