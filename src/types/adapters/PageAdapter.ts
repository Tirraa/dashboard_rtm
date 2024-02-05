/* v8 ignore start */
// Stryker disable all
import type { INDEX_TOKEN } from '##/lib/misc/contentlayerCornerCases';
import type { PagesFromCodegenSchema } from '@rtm/generated/Pages';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { DefaultLanguage } from '##/config/i18n';

type IndexToken = typeof INDEX_TOKEN;
type PathSeparator = '/';
type TopLevelRoot = '/';

// * ... Adapter (narrowing & rewriting)
type PageAdapter<P extends PagesFromCodegenSchema> = P extends { head: LanguageFlag }
  ? P extends { head: DefaultLanguage }
    ? {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        path: P['path'] extends `${infer Head}${PathSeparator}${IndexToken}`
          ? Head extends `${DefaultLanguage}/${infer Tail}`
            ? Tail
            : never
          : P['pathWithoutHead'];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        url: P['url'] extends `${infer Head}${PathSeparator}${IndexToken}` ? Head : P['url'];
        root: P['nestingLevelTwo'] extends '' ? TopLevelRoot : P['nestingLevelTwo'];
        lang: DefaultLanguage;
      }
    : {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        url: P['url'] extends `${TopLevelRoot}${P['head']}${PathSeparator}${infer _}`
          ? P['url'] extends `${infer Head}${PathSeparator}${IndexToken}`
            ? Head
            : P['url']
          : P['url'] extends `${infer Head}${PathSeparator}${IndexToken}`
            ? `${TopLevelRoot}${P['head']}${Head}`
            : `${TopLevelRoot}${P['head']}${P['url']}`;
        path: P['pathWithoutHead'] extends `${infer Head}${PathSeparator}${IndexToken}` ? Head : P['pathWithoutHead'];
        root: P['nestingLevelTwo'] extends '' ? TopLevelRoot : P['nestingLevelTwo'];
        lang: P['head'];
      }
  : {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      url: P['url'] extends `${TopLevelRoot}${DefaultLanguage}${PathSeparator}${infer _}`
        ? P['url'] extends `${infer Head}${PathSeparator}${IndexToken}`
          ? Head
          : P['url']
        : P['url'] extends `${infer Head}${PathSeparator}${IndexToken}`
          ? `${TopLevelRoot}${DefaultLanguage}${Head}`
          : `${TopLevelRoot}${DefaultLanguage}${P['url']}`;
      root: P['path'] extends `${P['head']}${PathSeparator}${IndexToken}` ? TopLevelRoot : P['head'];
      path: P['path'] extends `${infer Head}${PathSeparator}${IndexToken}` ? Head : P['path'];
      lang: DefaultLanguage;
    };

export default PageAdapter;
// Stryker restore all
/* v8 ignore stop */