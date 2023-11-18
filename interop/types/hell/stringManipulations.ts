import type { CompareFun, Tuple } from '@/types/CustomUtilitaryTypes';
import type { LanguageFlag } from './i18n';

export type StringsCompareFun = CompareFun<Tuple<string>> | CompareFun<Tuple<string>, [LanguageFlag]>;
