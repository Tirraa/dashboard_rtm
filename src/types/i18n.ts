import { ELanguagesFlag } from '@/config/i18n';
import SKELETON_LANGUAGE_OBJ, { SHARED } from '@/i18n/locales/skeleton';
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

type SharedVocabBase = typeof SHARED;
export type SharedVocabType = MakeHomogeneousValuesObjType<SharedVocabBase, VocabObjValue>;

type VocabBase = typeof SKELETON_LANGUAGE_OBJ;
export type VocabType = MakeHomogeneousValuesObjType<VocabBase, VocabObjValue>;
export type I18nVocabTarget = MakeVocabTargets<VocabBase>;

type LanguageFlagKey = keyof typeof ELanguagesFlag;
export type LanguageFlag = LanguageFlagKey;

type NextInternationalMagic = {
  default: VocabBase;
};

export type I18nMiddlewareConfig = {
  locales: LanguageFlag[];
  defaultLocale: LanguageFlag;
  urlMappingStrategy: 'rewriteDefault' | 'redirect';
};

export type LocalesObj = Record<LanguageFlag, () => Promise<NextInternationalMagic>>;
export type LocalesGetterConfigObjTypeConstraint = Record<LanguageFlag, () => Promise<TypedLeafsJSONData<VocabObjValue>>>;
