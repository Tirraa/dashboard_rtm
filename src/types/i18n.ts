import { ELanguageFlag, VocabBase } from '@/config/i18n';

type KeySeparator = '.';
type VocabObjKeyOrValue = string;

type VocabRecursiveKeys<T, K extends VocabObjKeyOrValue = ''> = T extends object
  ? {
      [P in keyof T]: P extends VocabObjKeyOrValue ? VocabRecursiveKeys<T[P], `${K}${K extends '' ? '' : KeySeparator}${P}`> : never;
    }[keyof T]
  : K;

type RecursiveStringObject<T = string> = {
  [key: string]: T | RecursiveStringObject<T>;
};

type CreateInterfaceFromObject<T> = {
  [K in keyof T]: T[K] extends RecursiveStringObject ? CreateInterfaceFromObject<T[K]> : string;
};

export type I18nVocabTarget = VocabRecursiveKeys<VocabBase>;
export type VocabInterface = CreateInterfaceFromObject<VocabBase>;

type LanguageFlagKey = keyof typeof ELanguageFlag;
export type LanguageFlag = LanguageFlagKey;
