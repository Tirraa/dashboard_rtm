import { ELanguageFlag, VocabBase } from '@/config/i18n';

type KeySeparator = '.';
type VocabObjKeyOrValue = string;
type VocabObjKey = string;
type VocabObjValue = string;

type VocabRecursiveKeys<T, K extends VocabObjKeyOrValue = ''> = T extends object
  ? {
      [P in keyof T]: P extends VocabObjKeyOrValue ? VocabRecursiveKeys<T[P], `${K}${K extends '' ? '' : KeySeparator}${P}`> : never;
    }[keyof T]
  : K;

type RecursiveVocabInterface<T = string> = {
  [key: VocabObjKey]: T | RecursiveVocabInterface<T>;
};

type MakeVocabInterface<T> = {
  [K in keyof T]: T[K] extends RecursiveVocabInterface ? MakeVocabInterface<T[K]> : VocabObjValue;
};

export type I18nVocabTarget = VocabRecursiveKeys<VocabBase>;
export type VocabInterface = MakeVocabInterface<VocabBase>;

type LanguageFlagKey = keyof typeof ELanguageFlag;
export type LanguageFlag = LanguageFlagKey;
