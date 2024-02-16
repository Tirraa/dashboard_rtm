/* v8 ignore start */
// Stryker disable all
//!\ TESTED VIA JEST-TSD

import type { DefaultLanguageToken, LandingPages } from '@rtm/generated';
import type { DefaultLanguage } from '##/config/i18n';

// * ... Adapter (narrowing & rewriting)
type LpLanguageAndSlugPair<__LandingPages extends object = LandingPages> = {
  [Category in keyof __LandingPages]: {
    [Lang in keyof __LandingPages[Category]]: {
      lang: Lang extends DefaultLanguageToken ? DefaultLanguage : Lang;
      slug: __LandingPages[Category][Lang];
    };
  }[keyof __LandingPages[Category]];
}[keyof __LandingPages];

export default LpLanguageAndSlugPair;

// Stryker restore all
/* v8 ignore stop */
