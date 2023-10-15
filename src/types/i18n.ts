import { ELanguagesFlag } from '@/config/i18n';
import VOCAB_SCHEMA, { SHARED_VOCAB_SCHEMA } from '@/i18n/locales/schema';
import { MakeHomogeneousValuesObjType } from '@/types/CustomUtilitaryTypes';
import { TypedLeafsJSONData } from '@/types/JSON';
import { RemovePlural } from '@/types/international-types';

type KeySeparator = '.';

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

type SharedVocabBase = typeof SHARED_VOCAB_SCHEMA;
export type SharedVocabType = MakeHomogeneousValuesObjType<SharedVocabBase, VocabObjValue>;

type VocabBase = typeof VOCAB_SCHEMA;
export type VocabType = MakeHomogeneousValuesObjType<VocabBase, VocabObjValue>;
export type I18nVocabTarget = MakeVocabTargets<VocabBase>;

type LanguageFlagKey = keyof typeof ELanguagesFlag;
export type LanguageFlag = LanguageFlagKey;

type NextInternationalMagic = {
  default: VocabType;
};

export type I18nMiddlewareConfig = {
  locales: LanguageFlag[];
  defaultLocale: LanguageFlag;
  urlMappingStrategy: 'rewriteDefault' | 'redirect';
};

type LocalesObjKey = LanguageFlag;
type NextInternationalLazyLoadFn = () => Promise<NextInternationalMagic>;

export type LocalesObjEntity = [LocalesObjKey, NextInternationalLazyLoadFn];
export type LocalesObj = Record<LocalesObjKey, NextInternationalLazyLoadFn>;
export type LocalesGetterConfigObjTypeConstraint = Record<LanguageFlag, () => Promise<TypedLeafsJSONData<VocabObjValue>>>;
