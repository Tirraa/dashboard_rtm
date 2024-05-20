/* v8 ignore start */
import type { StringsCompareFun } from '@rtm/shared-types/StringManipulations';

// Stryker Workaround 1. Pointless mutant (just a localeCompare wrapper)
// Stryker disable next-line all
export const compareAlphabeticallyAsc: StringsCompareFun = (s1, s2, locale) => s1.localeCompare(s2, locale, { sensitivity: 'base' });

// Stryker Workaround 2. Pointless mutant (just a localeCompare wrapper)
// Stryker disable next-line all
export const compareAlphabeticallyDesc: StringsCompareFun = (s1, s2, locale) => -s1.localeCompare(s2, locale, { sensitivity: 'base' });

/* v8 ignore stop */
