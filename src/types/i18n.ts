import { ELanguageFlag, VocabBase } from '@/config/i18n';

type KeySeparator = '.';
type VocabObjKeyOrValue = string;
type VocabObjValue = string;

type VocabRecursiveKeys<T, K extends VocabObjKeyOrValue = ''> = T extends object
  ? {
      [P in keyof T]: P extends VocabObjKeyOrValue ? VocabRecursiveKeys<T[P], `${K}${K extends '' ? '' : KeySeparator}${P}`> : never;
    }[keyof T]
  : K;

type RecursiveVocabType<T = VocabObjKeyOrValue> = {
  [_: VocabObjKeyOrValue]: T | RecursiveVocabType<T>;
};

type MakeVocabType<T> = {
  [K in keyof T]: T[K] extends RecursiveVocabType ? MakeVocabType<T[K]> : VocabObjValue;
};

export type I18nVocabTarget = VocabRecursiveKeys<VocabBase>;
export type VocabType = MakeVocabType<VocabBase>;

type LanguageFlagKey = keyof typeof ELanguageFlag;
export type LanguageFlag = LanguageFlagKey;
