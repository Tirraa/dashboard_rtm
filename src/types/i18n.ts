import type { ELanguagesFlag } from '@/config/i18n';
import type VOCAB_SCHEMA from '@/i18n/locales/schema';
import type { SHARED_VOCAB_SCHEMA } from '@/i18n/locales/schema';
import type { getScopedI18n } from '@/i18n/server';
import type { KeySeparator, MakeHomogeneousValuesObjType, UnionToLiteral } from '@/types/CustomUtilitaryTypes';
import type { TypedLeafsJSONData } from '@/types/JSON';
import type { RemovePlural } from '@/types/international-types';

type AllowedVocabObjValuesTypes = string;

type VocabObjKey = string;
type VocabObjKeyDeepPath = string;
type VocabObjValue = AllowedVocabObjValuesTypes;

type UnknownVocabObj = {
  [_: VocabObjKey]: UnknownVocabObj | VocabObjValue;
};

type VocabOrVocabLeaf = UnknownVocabObj | VocabObjValue;

type MakeVocabTargets<VorVL extends VocabOrVocabLeaf, CurrentDeepPath extends VocabObjKeyDeepPath = ''> = VorVL extends UnknownVocabObj
  ? {
      [VKorVL in keyof VorVL]: VKorVL extends VocabObjKey
        ? MakeVocabTargets<VorVL[VKorVL], `${CurrentDeepPath}${CurrentDeepPath extends '' ? '' : KeySeparator}${VKorVL}`>
        : never;
    }[keyof VorVL]
  : RemovePlural<CurrentDeepPath>;

type MakeVocabTargetsScopes<T extends string, Delimiter extends string = KeySeparator> = T extends `${infer First}.${infer Rest}`
  ? First | `${First}.${MakeVocabTargetsScopes<Rest, Delimiter>}`
  : Exclude<T | UnionToLiteral<T>, T>;

type SharedVocabBase = typeof SHARED_VOCAB_SCHEMA;
export type SharedVocabType = MakeHomogeneousValuesObjType<SharedVocabBase, VocabObjValue>;

type VocabBase = typeof VOCAB_SCHEMA;
export type VocabType = MakeHomogeneousValuesObjType<VocabBase, VocabObjValue>;
export type I18nVocabTarget = MakeVocabTargets<VocabBase>;
export type I18nVocabScope = MakeVocabTargetsScopes<I18nVocabTarget>;

type LanguageFlagKey = keyof typeof ELanguagesFlag;
export type LanguageFlag = LanguageFlagKey;

type NextInternationalMagic = {
  default: VocabType;
};

export type UnstrictScopedT = Awaited<ReturnType<typeof getScopedI18n<I18nVocabScope>>>;

export type I18nMiddlewareConfig = {
  locales: LanguageFlag[];
  defaultLocale: LanguageFlag;
  urlMappingStrategy: 'rewriteDefault' | 'redirect';
};

type LocalesObjKey = LanguageFlag;
type NextInternationalLazyLoadFun = () => Promise<NextInternationalMagic>;

export type LanguageLabels = Record<LanguageFlag, string>;

export type LocalesObjEntity = [LocalesObjKey, NextInternationalLazyLoadFun];
export type LocalesObj = Record<LocalesObjKey, NextInternationalLazyLoadFun>;
export type LocalesGetterConfigObjTypeConstraint = Record<LanguageFlag, () => Promise<TypedLeafsJSONData<VocabObjValue>>>;

export type ChangeLocaleFun = (language: LanguageFlag) => void;

export type PagesTitlesKey = keyof SharedVocabType['pages-titles'];
