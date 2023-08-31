import { ELanguageFlag, LanguageFlag } from '@/config/i18n';
import getEnumKeys, { getEnumFirstKey } from '@/lib/misc/getEnumKeys';
import { i18nNamespace } from '@/types/UglyTypes';
import { InitOptions } from 'i18next';

export const keySeparator = ':';
export const cookieName: string = 'i18next';
export const languages: string[] = getEnumKeys(ELanguageFlag);
export const fallbackLng: LanguageFlag = getEnumFirstKey(ELanguageFlag) as LanguageFlag;
export const defaultNS = 'vocab';

export function getOptions(lng: LanguageFlag = fallbackLng, ns: i18nNamespace = defaultNS): InitOptions {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    keySeparator
  };
}
