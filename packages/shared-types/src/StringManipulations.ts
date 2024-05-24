/* v8 ignore start */
// Stryker disable all

import type { CompareFun, Couple } from '@rtm/shared-types/CustomUtilityTypes';
import type LanguageFlag from '@rtm/shared-types/LanguageFlag';

export type StringsCompareFun = CompareFun<Couple<string>, [LanguageFlag]> | CompareFun<Couple<string>>;

// Stryker restore all
/* v8 ignore stop */
