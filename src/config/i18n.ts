export enum ELanguageFlag {
  fr,
  en
}

type LanguageFlagKey = keyof typeof ELanguageFlag;
export type LanguageFlag = LanguageFlagKey & string;
