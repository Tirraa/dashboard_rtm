/* v8 ignore start */
// Stryker disable all

import type { PageTaxonomyType } from '##/config/taxonomies/pages';
import type { Pages } from '@rtm/generated';

import type PageAdapter from './adapters/PageAdapter';
import type { I18nParams } from './Next';

type PagePropsParams = PageTaxonomyType;

export interface PageProps {
  params: PagePropsParams & I18nParams;
}

export type UnknownPagePath = string;
export type PageRoot = StrictPage['root'];

type StrictPage = {
  [Category in keyof Pages]: PageAdapter<Pages[Category][number]>;
}[keyof Pages];

export type PageLang = StrictPage['lang'];
export type PagePath<L extends PageLang> = Extract<StrictPage, { lang: L }>['path'];

// Stryker restore all
/* v8 ignore stop */
