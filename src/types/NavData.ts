/* v8 ignore start */
import type { I18nVocabTarget } from '@rtm/shared-types/I18n';
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

type NavbarItem = { i18nTitle: I18nVocabTarget; jsx: JSX.Element };
export type NavbarItems = NavbarItem[];

export type DropdownsConfig<K extends RoutesKeysUnion> = Partial<Record<K, NavDataEntities>>;
/* v8 ignore stop */
