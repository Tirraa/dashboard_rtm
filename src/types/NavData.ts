import { AppPath } from '@/types/Next';
import RoutesKeysUnion from './RoutesKeysUnion';
import { I18nVocabTarget } from './i18n';

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

export type DropdownsConfig<K extends RoutesKeysUnion> = Partial<Record<K, NavDataEntities>>;
