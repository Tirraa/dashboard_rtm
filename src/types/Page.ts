/* v8 ignore start */
// Stryker disable all

import type { INDEX_TOKEN } from '##/lib/misc/contentlayerCornerCases';
import type { PageTaxonomyType } from '##/config/taxonomies/pages';
import type { Pages } from '@rtm/generated';

import type PageAdapter from './adapters/PageAdapter';
import type { I18nParams } from './Next';

type PagePropsParams = PageTaxonomyType;

export interface PageProps {
  params: PagePropsParams & I18nParams;
}

export type IndexToken = typeof INDEX_TOKEN;

export type UnknownPagePath = string;
export type PageRoot = StrictPage['root'];

type StrictPage = {
  [Category in keyof Pages]: PageAdapter<Pages[Category][number]>;
}[keyof Pages];

export type MakePagesLangAndPathPairs<__URL extends string = StrictPage['url']> = __URL extends `/${infer Lang}/${infer Path}`
  ? { lang: Lang; path: Path }
  : __URL extends `/${infer Lang}`
    ? { path: IndexToken; lang: Lang }
    : never;

export type LangAndPathPair = MakePagesLangAndPathPairs;

export type PagePath = StrictPage['path'];

// Stryker restore all
/* v8 ignore stop */
