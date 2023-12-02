import type { LanguageFlag } from '##/types/magic/i18n';
import { LANGUAGES } from '../../../../interop/config/i18n';

export const isValidLanguageFlag = (key: string): key is LanguageFlag => (LANGUAGES as string[]).includes(key);
export default isValidLanguageFlag;
