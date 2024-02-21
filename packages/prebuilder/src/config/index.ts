/* v8 ignore start */
// Stryker disable all

import type { FormatCodeSettings } from 'ts-morph';

import config from '../../prebuilder.config';
import defaultConfig from './defaultConfig';

const MY_MAX_PAGE_TAXONOMY_LEN: number = config.maxPageTaxonomyLen ?? defaultConfig.maxPageTaxonomyLen;
const MY_MAX_BLOG_TAXONOMY_LEN: number = config.maxBlogTaxonomyLen ?? defaultConfig.maxBlogTaxonomyLen;
const MY_MAX_LP_TAXONOMY_LEN: number = config.maxLpTaxonomyLen ?? defaultConfig.maxLpTaxonomyLen;
const MY_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS: string[] =
  config.i18nCategoriesRequiredExtraFields ?? defaultConfig.i18nCategoriesRequiredExtraFields;
const MY_I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS: string[] =
  config.i18nSubcategoriesRequiredExtraFields ?? defaultConfig.i18nSubcategoriesRequiredExtraFields;
const MY_DEFAULT_LANGUAGE_KEY: string = config.defaultLanguageKey ?? defaultConfig.defaultLanguageKey;

export const FLAGS = {
  I18N_LOCALES_SCHEMA_FILEPATH: '--i18n-locales-schema',
  SKIP_LOCALES_INFOS: '--skip-locales-infos',
  BLOG_POSTS_FOLDER: '--blog-posts-folder',
  SKIP_BENCHMARKS: '--skip-benchmarks',
  LANDING_PAGES_FOLDER: '--lp-folder',
  PRETTY_CODEGEN: '--pretty-codegen',
  PAGES_FOLDER: '--pages-folder',
  NO_PAGES: '--no-pages',
  NO_BLOG: '--no-blog',
  NO_I18N: '--no-i18n',
  NO_LP: '--no-lp',
  WATCH: '--watch',
  LANG: '--lang'
} as const satisfies Record<PropertyKey, string>;

export const MAX_PAGE_TAXONOMY_LEN: number = MY_MAX_PAGE_TAXONOMY_LEN;
export const MAX_BLOG_TAXONOMY_LEN: number = MY_MAX_BLOG_TAXONOMY_LEN;
export const MAX_LP_TAXONOMY_LEN: number = MY_MAX_LP_TAXONOMY_LEN;

export const I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS: string[] = [...MY_I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS, 'title', 'meta-description'];
export const I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS: string[] = [...MY_I18N_SUBCATEGORIES_REQUIRED_EXTRA_FIELDS, 'title', 'meta-description'];

export const LIST_ELEMENT_PREFIX: string = '\n - ';
export const TAB_SIZE = 2;
export const TS_MORPH_FORMATTER_SETTINGS = { ensureNewLineAtEndOfFile: true, indentSize: TAB_SIZE } as const satisfies FormatCodeSettings;

export const PAGE_FILE_EXT: string = '.mdx';
export const BLOG_POST_FILE_EXT: string = '.mdx';
export const LP_FILE_EXT: string = '.mdx';
export const I18N_CATEGORIES_REQUIRED_EXTRA_FIELDS_PREFIX: string = '_';
export const DEFAULT_LANGUAGE_TOKEN_TYPE_STR: string = 'DefaultLanguageToken';
export const PAGES_TYPE_STR: string = 'Pages';
export const PAGES_FROM_CODEGEN_SCHEMA_TYPE_STR: string = 'PagesFromCodegenSchema';
export const BLOG_TYPE_STR: string = 'Blog';
export const LP_TYPE_STR: string = 'LandingPages';
export const BLOG_ARCHITECTURE_TYPE_STR: string = 'BlogArchitecture';
export const BLOG_CATEGORIES_CONST_STR: string = 'blogCategories';
export const PAGES_TITLES_CONST_STR: string = 'pagesTitles';
export const GENERATIONS_TARGET_FOLDER: string = '.rtm-generated';

export const LOCALES_INFOS_ROOT_KEY: string = '_infos';
export const LOCALES_LNG_INFOS_KEY: string = 'lng';
export const LOCALES_INFOS_OBJ_NEEDLE: string = LOCALES_INFOS_ROOT_KEY + ':';
export const ROOT_FOLDER_RELATIVE_PATH_FROM_PREBUILDER_CTX: string = '../../../../';
export const DEFAULT_LANGUAGE_KEY: string = MY_DEFAULT_LANGUAGE_KEY;
export const AUTOGENERATED_CODE_COMMENT_STR: string = "// AUTOGENERATED: Don't edit this file!\n";

export const DOC_URL: string = 'https://github.com/Tirraa/dashboard_rtm/tree/main/doc';
export const BUGTRACKER_URL: string = 'https://github.com/Tirraa/dashboard_rtm/issues';

// Stryker restore all
/* v8 ignore stop */
