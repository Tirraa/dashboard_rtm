import type i18nTaxonomy from '@/taxonomies/i18n';
import type NotFoundTaxonomy from '@/taxonomies/notfound';
import type { ClassName } from '@/types/React';
import type { LanguageFlag } from '@/types/i18n';
import type { NextMiddleware } from 'next/server';
import type { ReactNode } from 'react';

export type WithChildren = { children: ReactNode };
export interface LayoutMinimalProps extends WithChildren {}

export interface WithClassname extends ClassName {}

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
