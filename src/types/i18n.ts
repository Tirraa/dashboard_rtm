import { ELanguageFlag, VocabBase } from '@/config/i18n';

export type KeySeparator = '.';

type RecursiveKeys<T, K extends string | number = ''> = T extends object
  ? {
      [P in keyof T]: P extends string ? RecursiveKeys<T[P], `${K}${K extends '' ? '' : KeySeparator}${P}`> : never;
    }[keyof T]
  : K;

type RecursiveStringObject<T = string> = {
  [key: string]: T | RecursiveStringObject<T>;
};

type CreateInterfaceFromObject<T> = {
  [K in keyof T]: T[K] extends RecursiveStringObject ? CreateInterfaceFromObject<T[K]> : string;
};

export type I18nVocabTarget = RecursiveKeys<VocabBase>;
export type VocabInterface = CreateInterfaceFromObject<VocabBase>;

type LanguageFlagKey = keyof typeof ELanguageFlag;
export type LanguageFlag = LanguageFlagKey & string;
