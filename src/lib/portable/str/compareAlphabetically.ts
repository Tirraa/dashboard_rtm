/* v8 ignore start */
import type { StringsCompareFun } from '@rtm/shared-types/StringManipulations';

// Stryker Workaround 1. Pointless mutant (no coverage on s2, locale, {}).
// Stryker disable next-line ObjectLiteral
export const compareAlphabeticallyAsc: StringsCompareFun = (s1, s2, locale) => s1.localeCompare(s2, locale, { sensitivity: 'base' });

// Stryker Workaround 1. Pointless mutant (no coverage on s2, locale, {}).
// Stryker disable next-line ObjectLiteral
export const compareAlphabeticallyDesc: StringsCompareFun = (s1, s2, locale) => -s1.localeCompare(s2, locale, { sensitivity: 'base' });

/* v8 ignore stop */
