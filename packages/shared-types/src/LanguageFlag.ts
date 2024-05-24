/* v8 ignore start */
// Stryker disable all

import type { ELanguagesFlag } from '##/config/i18n';

type LanguageFlagKey = keyof typeof ELanguagesFlag;
type LanguageFlag = LanguageFlagKey;
export type UnknownLanguageFlag = string;
export default LanguageFlag;

// Stryker restore all
/* v8 ignore stop */
