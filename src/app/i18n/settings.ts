import { ELanguageFlag, LanguageFlag } from '@/config/i18n';
import { i18nNamespace } from '@/types/i18nInitOptions';
import { InitOptions } from 'i18next';

export const cookieName: string = 'i18next';
export const languages: string[] = Object.keys(ELanguageFlag).filter((key) => isNaN(Number(key))) as string[];
export const fallbackLng: LanguageFlag = Object.values(ELanguageFlag)[0] as LanguageFlag;
export const defaultNS = 'vocab';

export function getOptions(lng: string = fallbackLng, ns: i18nNamespace = defaultNS): InitOptions {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  };
}
