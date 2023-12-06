import type { I18nVocabTarget } from '##/types/magic/I18n';
import type { AppPath } from '@rtm/shared-types/Next';
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

export interface NavbarElementProps extends NavDataEntity {}

export type NavbarItem = { jsx: JSX.Element; i18nTitle: I18nVocabTarget };
export type NavbarItems = NavbarItem[];

export type DropdownsConfig<K extends RoutesKeysUnion> = Partial<Record<K, NavDataEntities>>;
