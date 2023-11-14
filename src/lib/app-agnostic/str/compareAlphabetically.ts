import type { LanguageFlag } from '##/types/hell/i18n';
import type { StringsCompareFun } from '##/types/hell/stringManipulations';

export const compareAlphabetically: StringsCompareFun = (s1: string, s2: string, locale: LanguageFlag): number =>
  s1.localeCompare(s2, locale, { sensitivity: 'base' });

export default compareAlphabetically;
