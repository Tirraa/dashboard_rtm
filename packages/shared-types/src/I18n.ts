/* v8 ignore start */
// Stryker disable all
//!\ TESTED VIA JEST-TSD

import type { MakeHomogeneousValuesObjType, DeepPathToLiteralKeys, KeySeparator } from '@rtm/shared-types/CustomUtilityTypes';
import type { TypedLeafsJSONData, JSONKey } from '@rtm/shared-types/JSON';
import type { RemovePlural } from '@rtm/shared-types/international-types';
import type { SHARED_VOCAB_SCHEMA } from '@/i18n/locales/schema';
import type LanguageFlag from '@rtm/shared-types/LanguageFlag';
import type VOCAB_SCHEMA from '@/i18n/locales/schema';

type AllowedVocabObjValuesTypes = string;

type VocabObjKey = JSONKey;
type VocabObjKeyDeepPath = string;
export type VocabObjValue = AllowedVocabObjValuesTypes;

type UnknownVocabObj = { [_: VocabObjKey]: UnknownVocabObj | VocabObjValue };
type VocabOrVocabLeaf = UnknownVocabObj | VocabObjValue;

export type MakeVocabTargets<VorVL extends VocabOrVocabLeaf, __CurrentDeepPath extends VocabObjKeyDeepPath = ''> = VorVL extends UnknownVocabObj
  ? {
      [VKorVL in keyof VorVL]: VKorVL extends VocabObjKey
        ? MakeVocabTargets<VorVL[VKorVL], `${__CurrentDeepPath}${__CurrentDeepPath extends '' ? '' : KeySeparator}${VKorVL}`>
        : never;
    }[keyof VorVL]
  : RemovePlural<__CurrentDeepPath>;

export type MakeVocabTargetsScopes<Target extends string> = Target extends `${infer Namespace}${KeySeparator}${infer Tail}`
  ? `${Namespace}${KeySeparator}${MakeVocabTargetsScopes<Tail>}` | Namespace
  : DeepPathToLiteralKeys<Target>;

type SharedVocabBase = typeof SHARED_VOCAB_SCHEMA;
export type SharedVocabType = MakeHomogeneousValuesObjType<SharedVocabBase, VocabObjValue>;

type VocabBase = typeof VOCAB_SCHEMA;
export type VocabType = MakeHomogeneousValuesObjType<VocabBase, VocabObjValue>;
export type I18nVocabTarget = MakeVocabTargets<VocabBase>;
export type I18nVocabScope = MakeVocabTargetsScopes<I18nVocabTarget>;

export type I18nMiddlewareConfig = {
  urlMappingStrategy: 'rewriteDefault' | 'redirect';
  defaultLocale: LanguageFlag;
  locales: LanguageFlag[];
};

type LocalesObjKey = LanguageFlag;
type NextInternationalMagic = { default: VocabType };
type NextInternationalLazyLoadFun = () => Promise<NextInternationalMagic>;

export type LanguageLabels = Record<LanguageFlag, string>;

export type LocalesObjEntity = [LocalesObjKey, NextInternationalLazyLoadFun];
export type LocalesObj = Record<LocalesObjKey, NextInternationalLazyLoadFun>;
export type LocalesGetterConfigObjTypeConstraint = Record<LanguageFlag, () => Promise<TypedLeafsJSONData<VocabObjValue>>>;

export type ChangeLocaleFun = (language: LanguageFlag) => void;

export type PagesTitlesKey = keyof VocabType['pages-titles'];

type NamespacesKeys<__VocabType extends UnknownVocabObj = VocabType> = {
  [K in keyof __VocabType]-?: __VocabType[K] extends UnknownVocabObj
    ? K
    : // eslint-disable-next-line @typescript-eslint/no-unused-vars
      K extends `${infer Namespace}${KeySeparator}${infer _}`
      ? Namespace
      : never;
}[keyof __VocabType];

type FlipI18nsBase<I18NS_CONST extends I18nsBase<__VocabType>, __VocabType extends UnknownVocabObj = VocabType> = {
  [P in keyof I18NS_CONST as I18NS_CONST[P]]: P;
};

type ExpectedI18nsBaseValues<__VocabType extends UnknownVocabObj = VocabType> = Record<NamespacesKeys<__VocabType>, unknown>;
type GivenI18nsBaseValues<FLIPPED_I18NS_CONST extends object> = Record<keyof FLIPPED_I18NS_CONST, unknown>;
type I18nsBaseDiff<OBJ_A extends object, OBJ_B extends object> = { [K in Exclude<keyof OBJ_A, keyof OBJ_B>]: K };

export type I18nsBase<__VocabType extends UnknownVocabObj = VocabType> = Record<PropertyKey, NamespacesKeys<__VocabType>>;
export type MakeI18nsBase<
  I18NS_CONST extends I18nsBase<__VocabType>,
  __VocabType extends UnknownVocabObj = VocabType,
  __FLIP extends object = FlipI18nsBase<I18NS_CONST, __VocabType>
> = NamespacesKeys<__VocabType> extends keyof __FLIP
  ? I18NS_CONST
  : I18NS_CONST extends I18nsBase<__VocabType>
    ? I18nsBaseDiff<ExpectedI18nsBaseValues<__VocabType>, GivenI18nsBaseValues<__FLIP>>
    : never;

export type { LanguageFlag };

// Stryker restore all
/* v8 ignore stop */
