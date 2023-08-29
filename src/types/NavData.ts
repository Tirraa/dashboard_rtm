import { Path } from '@/types/Next';
import { I18nVocabAccessInfos } from './I18n';

type NavDataRouteTitle = string;

export type NavDataRouteTitleInfos = I18nVocabAccessInfos;
export type NavDataRoutesTitles = Record<NavDataRouteTitle, NavDataRouteTitleInfos>;

export interface AtomicNavDataEntity {
  i18nTitleInfos: NavDataRouteTitleInfos;
  path: Path;
}

export type EmbeddedEntities = AtomicNavDataEntity[];
export interface NavDataEntity extends AtomicNavDataEntity {
  embeddedEntities?: EmbeddedEntities;
}

export interface NavbarDropdownElement extends Required<NavDataEntity> {}
export type NavDataEntities = NavDataEntity[];

export type DropdownsConfig<T extends string> = Partial<Record<T, NavDataEntities>>;
