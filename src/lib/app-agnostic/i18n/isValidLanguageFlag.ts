import { LANGUAGES } from '../../../../interop/config/i18n';

export const isValidLanguageFlag = (key: string): boolean => (LANGUAGES as string[]).includes(key);
export default isValidLanguageFlag;
