/* v8 ignore start */
// Stryker disable all
import type DefaultLanguageToken from '@rtm/generated/DefaultLanguageToken';
import type LandingPages from '@rtm/generated/LandingPages';
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
