/* v8 ignore start */
// Stryker disable all
import type { ELanguagesFlag } from '##/config/i18n';

type LanguageFlagKey = keyof typeof ELanguagesFlag;
export type LanguageFlag = LanguageFlagKey;
export default LanguageFlag;
// Stryker restore all
/* v8 ignore stop */
