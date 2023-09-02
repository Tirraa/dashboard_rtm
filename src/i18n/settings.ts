import { ELanguageFlag } from '@/config/i18n';
import getEnumKeys from '@/lib/misc/getEnumKeys';
import { KeySeparator } from '@/types/i18n';

export const languages: string[] = getEnumKeys(ELanguageFlag);
export const sep: KeySeparator = '.';
export const cookieName = 'Next-Locale';
