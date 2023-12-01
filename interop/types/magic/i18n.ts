import type VOCAB_SCHEMA from '@/i18n/locales/schema';
import type { SHARED_VOCAB_SCHEMA } from '@/i18n/locales/schema';
import type { getScopedI18n } from '@/i18n/server';
import type { DeepPathToLiteralKeys, KeySeparator, MakeHomogeneousValuesObjType } from '@rtm/shared-types/CustomUtilityTypes';
import type { RemovePlural } from '@rtm/shared-types/international-types';
import type { TypedLeafsJSONData } from '../JSON';
import type LanguageFlag from '../LanguageFlag';

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

type MakeVocabTargetsScopes<Target extends string> = Target extends `${infer Head}${KeySeparator}${infer Tail}`
  ? Head | `${Head}${KeySeparator}${MakeVocabTargetsScopes<Tail>}`
  : DeepPathToLiteralKeys<Target>;

type SharedVocabBase = typeof SHARED_VOCAB_SCHEMA;
export type SharedVocabType = MakeHomogeneousValuesObjType<SharedVocabBase, VocabObjValue>;

type VocabBase = typeof VOCAB_SCHEMA;
export type VocabType = MakeHomogeneousValuesObjType<VocabBase, VocabObjValue>;
export type I18nVocabTarget = MakeVocabTargets<VocabBase>;
export type I18nVocabScope = MakeVocabTargetsScopes<I18nVocabTarget>;

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

export type PagesTitlesKey = keyof VocabType['pages-titles'];

type ExpectedI18nsValues = { [K in keyof VocabType]: unknown };
type GivenI18nsValues<FLIPPED_I18N_CONST extends object> = { [K in keyof FLIPPED_I18N_CONST]: unknown };
type FlipI18ns<I18NS_CONST extends I18ns> = { [P in keyof I18NS_CONST as I18NS_CONST[P]]: P };
type I18nsDiff<GivenI18nsValues extends object> = { [K in Exclude<keyof ExpectedI18nsValues, keyof GivenI18nsValues>]: K };

export type I18ns = Record<PropertyKey, keyof VocabType>;
export type MakeI18ns<I18NS_CONST extends I18ns> = keyof VocabType extends keyof FlipI18ns<I18NS_CONST>
  ? I18ns
  : I18NS_CONST extends I18ns
    ? I18nsDiff<GivenI18nsValues<FlipI18ns<I18NS_CONST>>>
    : never;

export type { LanguageFlag };
