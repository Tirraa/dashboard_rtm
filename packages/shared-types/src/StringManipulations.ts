import type { CompareFun, Tuple } from '@rtm/shared-types/CustomUtilityTypes';
import type { LanguageFlag } from '@rtm/shared-types/I18n';

export type StringsCompareFun = CompareFun<Tuple<string>> | CompareFun<Tuple<string>, [LanguageFlag]>;
