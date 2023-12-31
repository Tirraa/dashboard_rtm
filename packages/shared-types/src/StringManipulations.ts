/* v8 ignore start */
// Stryker disable all

import type { CompareFun, Tuple } from '@rtm/shared-types/CustomUtilityTypes';
import type { LanguageFlag } from '@rtm/shared-types/I18n';

export type StringsCompareFun = CompareFun<Tuple<string>, [LanguageFlag]> | CompareFun<Tuple<string>>;
/* v8 ignore stop */
// Stryker restore all
