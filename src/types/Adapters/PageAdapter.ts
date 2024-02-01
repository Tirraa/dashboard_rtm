/* v8 ignore start */
// Stryker disable all
import type { INDEX_TOKEN } from '##/lib/misc/contentlayerCornerCases';
import type { PagesFromCodegenSchema } from '@rtm/generated/Pages';
import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { DefaultLanguage } from '##/config/i18n';

type IndexToken = typeof INDEX_TOKEN;
type PathSeparator = '/';
type TopLevelRoot = '/';

type PageAdapter<P extends PagesFromCodegenSchema> = P extends { head: LanguageFlag }
  ? P extends { head: DefaultLanguage }
    ? {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        url: P['url'] extends `${TopLevelRoot}${DefaultLanguage}${PathSeparator}${infer _}`
          ? P['url']
          : `${TopLevelRoot}${DefaultLanguage}${P['url']}`;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        path: P['path'] extends `${infer _}${PathSeparator}${IndexToken}` ? IndexToken : P['path'];
        root: P['head'] extends DefaultLanguage ? TopLevelRoot : P['head'];
        lang: DefaultLanguage;
      }
    : {
        path: P['pathWithoutHead'] extends `${infer Head}${PathSeparator}${IndexToken}` ? Head : P['pathWithoutHead'];
        root: P['nestingLevelTwo'] extends '' ? TopLevelRoot : P['nestingLevelTwo'];
        lang: P['head'];
        url: P['url'];
      }
  : {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      url: P['url'] extends `${TopLevelRoot}${DefaultLanguage}${PathSeparator}${infer _}` ? P['url'] : `${TopLevelRoot}${DefaultLanguage}${P['url']}`;
      root: P['path'] extends `${P['head']}${PathSeparator}${IndexToken}` ? TopLevelRoot : P['head'];
      path: P['path'] extends `${infer Head}${PathSeparator}${IndexToken}` ? Head : P['path'];
      lang: DefaultLanguage;
    };

export default PageAdapter;
// Stryker restore all
/* v8 ignore stop */
