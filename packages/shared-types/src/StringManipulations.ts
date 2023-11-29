import type { LanguageFlag } from '##/types/magic/i18n';
import type { CompareFun, Tuple } from '@rtm/shared-types/CustomUtilityTypes';

export type StringsCompareFun = CompareFun<Tuple<string>> | CompareFun<Tuple<string>, [LanguageFlag]>;
