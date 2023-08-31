export enum ELanguageFlag {
  fr,
  en
}

export namespace i18ns {
  export const navbar = 'navbar';
  export const dashboard = 'dashboard';
  export const blogCategories = 'blog-categories';
}

type LanguageFlagKey = keyof typeof ELanguageFlag;
export type LanguageFlag = LanguageFlagKey & string;
