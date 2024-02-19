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

type ExtractLangAndPath<URL extends string> = URL extends `/${infer Lang}/${infer Path}`
  ? { lang: Lang; path: Path }
  : URL extends `/${infer Lang}`
    ? { path: IndexToken; lang: Lang }
    : never;

type PagesUrl = StrictPage['url'];

export type LangAndPathPair = ExtractLangAndPath<PagesUrl>;

export type PagePath = StrictPage['path'];

// extends `/${infer Lang}/${infer Path}` ? {lang: Lang, path: Path} : never;

// Stryker restore all
/* v8 ignore stop */
