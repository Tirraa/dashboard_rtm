import { ELanguageFlag } from '@/config/i18n';
import getEnumKeys from '@/lib/misc/getEnumKeys';

export const LANGUAGES: string[] = getEnumKeys(ELanguageFlag);
export const COOKIE_NAME = 'Next-Locale';
