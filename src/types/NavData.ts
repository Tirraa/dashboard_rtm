import { AppPath } from '@/types/Next';
import { I18nVocabTarget } from './i18n';

type NavDataRouteTitle = string;

export type NavDataRoutesTitles = Record<NavDataRouteTitle, I18nVocabTarget>;

export interface AtomicNavDataEntity {
  i18nTitle: I18nVocabTarget;
  path: AppPath;
}

export type EmbeddedEntities = AtomicNavDataEntity[];
export interface NavDataEntity extends AtomicNavDataEntity {
  embeddedEntities?: EmbeddedEntities;
}

export interface NavbarDropdownElement extends Required<NavDataEntity> {}
export type NavDataEntities = NavDataEntity[];

export type DropdownsConfig<T extends string> = Partial<Record<T, NavDataEntities>>;
