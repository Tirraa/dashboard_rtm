import { ELanguageFlag } from '@/config/i18n';
import getEnumKeys from '@/lib/misc/getEnumKeys';

export const languages: string[] = getEnumKeys(ELanguageFlag);
export const cookieName = 'Next-Locale';
