import { ELanguageFlag } from '@/config/i18n';
import getEnumKeys, { getEnumFirstKey } from '@/lib/misc/getEnumKeys';
import { KeySeparator, LanguageFlag } from '@/types/i18n';

export const languages: string[] = getEnumKeys(ELanguageFlag);
export const fallbackLng: LanguageFlag = getEnumFirstKey(ELanguageFlag) as LanguageFlag;
export const sep: KeySeparator = '.';
export const cookieName = 'Next-Locale';
