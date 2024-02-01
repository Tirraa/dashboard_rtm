/* v8 ignore start */
// Stryker disable all
import type DefaultLanguageToken from '@rtm/generated/DefaultLanguageToken';
import type LandingPages from '@rtm/generated/LandingPages';
import type { DefaultLanguage } from '##/config/i18n';

// * ... Adapter (narrowing & rewriting)
type LpLanguageAndSlugPair = {
  [Category in keyof LandingPages]: {
    [Lang in keyof LandingPages[Category]]: {
      lang: Lang extends DefaultLanguageToken ? DefaultLanguage : Lang;
      slug: LandingPages[Category][Lang];
    };
  }[keyof LandingPages[Category]];
}[keyof LandingPages];

export default LpLanguageAndSlugPair;
// Stryker restore all
/* v8 ignore stop */
