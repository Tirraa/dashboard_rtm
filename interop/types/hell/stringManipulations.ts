import type { LanguageFlag } from './i18n';

export type StringsCompareFun = (s1: string, s2: string, locale: LanguageFlag) => number;
