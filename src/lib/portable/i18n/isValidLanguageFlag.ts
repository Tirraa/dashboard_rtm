import type { LanguageFlag } from '##/types/magic/I18n';
import { LANGUAGES } from '../../../../interop/config/i18n';

const isValidLanguageFlag = (key: string): key is LanguageFlag => (LANGUAGES as string[]).includes(key);
export default isValidLanguageFlag;
