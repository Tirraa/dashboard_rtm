import type { StringsCompareFun } from '@rtm/shared-types/StringManipulations';

const compareAlphabetically: StringsCompareFun = (s1, s2, locale) => s1.localeCompare(s2, locale, { sensitivity: 'base' });

export default compareAlphabetically;
