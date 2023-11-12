import type { I18nVocabTarget } from '##/types/hell/i18n';
import type { AppPath, i18nParams } from '@/types/Next';
import type RoutesKeysUnion from './RoutesKeysUnion';

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

export interface NavbarElementProps extends NavDataEntity {
  i18nProps: i18nParams;
}

export type NavbarItem = { jsx: JSX.Element; i18nTitle: I18nVocabTarget };
export type NavbarItems = NavbarItem[];

export type DropdownsConfig<K extends RoutesKeysUnion> = Partial<Record<K, NavDataEntities>>;
