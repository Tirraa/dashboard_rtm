export enum ELanguageFlag {
  en
}

export type LanguageFlag = (keyof typeof ELanguageFlag | '') & string;
