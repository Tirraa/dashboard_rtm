import type VOCAB_SCHEMA from '@/i18n/locales/schema';
import type { SHARED_VOCAB_SCHEMA } from '@/i18n/locales/schema';
import type { getScopedI18n } from '@/i18n/server';
import type { DeepPathToLiteralKeys, KeySeparator, MakeHomogeneousValuesObjType } from '@rtm/shared-types/CustomUtilityTypes';
import type { RemovePlural } from '@rtm/shared-types/international-types';
import type { JSONKey, TypedLeafsJSONData } from '../JSON';
import type LanguageFlag from '../LanguageFlag';

type AllowedVocabObjValuesTypes = string;

type VocabObjKey = JSONKey;
type VocabObjKeyDeepPath = string;
type VocabObjValue = AllowedVocabObjValuesTypes;

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
  ? Namespace | `${Namespace}${KeySeparator}${MakeVocabTargetsScopes<Tail>}`
  : DeepPathToLiteralKeys<Target>;

type SharedVocabBase = typeof SHARED_VOCAB_SCHEMA;
export type SharedVocabType = MakeHomogeneousValuesObjType<SharedVocabBase, VocabObjValue>;

type VocabBase = typeof VOCAB_SCHEMA;
export type VocabType = MakeHomogeneousValuesObjType<VocabBase, VocabObjValue>;
export type I18nVocabTarget = MakeVocabTargets<VocabBase>;
type I18nVocabScope = MakeVocabTargetsScopes<I18nVocabTarget>;

export type UnstrictScopedT = Awaited<ReturnType<typeof getScopedI18n<I18nVocabScope>>>;

export type I18nMiddlewareConfig = {
  locales: LanguageFlag[];
  defaultLocale: LanguageFlag;
  urlMappingStrategy: 'rewriteDefault' | 'redirect';
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
    : // eslint-disable-next-line no-unused-vars
      K extends `${infer Namespace}${KeySeparator}${infer _}`
      ? Namespace
      : never;
}[keyof __VocabType];

type FlipI18ns<I18NS_CONST extends I18ns<__VocabType>, __VocabType extends UnknownVocabObj = VocabType> = {
  [P in keyof I18NS_CONST as I18NS_CONST[P]]: P;
};

type ExpectedI18nsValues<__VocabType extends UnknownVocabObj = VocabType> = Record<NamespacesKeys<__VocabType>, unknown>;
type GivenI18nsValues<FLIPPED_I18NS_CONST extends object> = Record<keyof FLIPPED_I18NS_CONST, unknown>;
type I18nsDiff<OBJ_A extends object, OBJ_B extends object> = { [K in Exclude<keyof OBJ_A, keyof OBJ_B>]: K };

export type I18ns<__VocabType extends UnknownVocabObj = VocabType> = Record<PropertyKey, NamespacesKeys<__VocabType>>;
export type MakeI18ns<
  I18NS_CONST extends I18ns<__VocabType>,
  __VocabType extends UnknownVocabObj = VocabType,
  __FLIP extends object = FlipI18ns<I18NS_CONST, __VocabType>
> = NamespacesKeys<__VocabType> extends keyof __FLIP
  ? I18NS_CONST
  : I18NS_CONST extends I18ns<__VocabType>
    ? I18nsDiff<ExpectedI18nsValues<__VocabType>, GivenI18nsValues<__FLIP>>
    : never;

export type { LanguageFlag };
