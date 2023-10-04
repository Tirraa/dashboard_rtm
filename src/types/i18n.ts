import { ELanguagesFlag, VocabBase } from '@/config/i18n';
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
      [MaybeVKorVLK in keyof VorVL]: MaybeVKorVLK extends VocabObjKey
        ? MakeVocabTargets<VorVL[MaybeVKorVLK], `${CurrentDeepPath}${CurrentDeepPath extends '' ? '' : KeySeparator}${RemovePlural<MaybeVKorVLK>}`>
        : never;
    }[keyof VorVL]
  : CurrentDeepPath;

export type VocabType = MakeHomogeneousValuesObjType<VocabBase, VocabObjValue>;
export type I18nVocabTarget = MakeVocabTargets<VocabBase>;

type LanguageFlagKey = keyof typeof ELanguagesFlag;
export type LanguageFlag = LanguageFlagKey;
export type LocalesGetterConfigObjTypeConstraint = Record<LanguageFlag, () => Promise<TypedLeafsJSONData<VocabObjValue>>>;
