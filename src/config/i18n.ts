export enum ELanguageFlag {
  fr,
  en
}

export namespace i18ns {
  export const navbar = 'navbar';
  export const dashboard = 'dashboard';
}

type LanguageFlagKey = keyof typeof ELanguageFlag;
export type LanguageFlag = LanguageFlagKey & string;
