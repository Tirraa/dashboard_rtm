import type { I18nVocabTarget } from '@rtm/shared-types/I18n';
import type { AppPath } from '@rtm/shared-types/Next';
import type { ReactElement } from 'react';
import type RoutesKeysUnion from './RoutesKeysUnion';

export type RoutesDefinition<RoutesKeys extends RoutesKeysUnion> = Record<RoutesKeys, AppPath>;
export type RoutesTitles<RoutesKeys extends RoutesKeysUnion> = Record<RoutesKeys, I18nVocabTarget>;
export type WeaklyBindedReactElements<K extends string> = Record<K, ReactElement>;
