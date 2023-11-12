import type { ELanguagesFlag } from '##/config/i18n';

type LanguageFlagKey = keyof typeof ELanguagesFlag;
export type LanguageFlag = LanguageFlagKey;
export default LanguageFlag;
