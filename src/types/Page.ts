import type { PagesFromCodegenSchema } from '@rtm/generated/Pages';
import type { TPageTaxonomy } from '##/config/taxonomies/pages';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { DefaultLanguage } from '##/config/i18n';
import type Pages from '@rtm/generated/Pages';

import type { I18nParams } from './Next';

type PagePropsParams = TPageTaxonomy;

export interface PageProps {
  params: PagePropsParams & I18nParams;
}

export type UnknownPagePath = string;
export type PageRoot = StrictPage['root'];

type PageAdapter<P extends PagesFromCodegenSchema> = P extends { head: LanguageFlag }
  ? P extends { head: DefaultLanguage }
    ? {
        url: `/${DefaultLanguage}${P['url']}`;
        lang: DefaultLanguage;
        path: P['path'];
        root: P['head'];
      }
    : {
        root: P['nestingLevelTwo'] extends '' ? '/' : P['nestingLevelTwo'];
        path: P['pathWithoutHead'];
        lang: P['head'];
        url: P['url'];
      }
  : {
      url: `/${DefaultLanguage}${P['url']}`;
      lang: DefaultLanguage;
      path: P['path'];
      root: P['head'];
    };

type StrictPage = {
  [Category in keyof Pages]: PageAdapter<Pages[Category][number]>;
}[keyof Pages];

export type PageLang = StrictPage['lang'];
export type PagePath<L extends PageLang> = Extract<StrictPage, { lang: L }>['path'];
