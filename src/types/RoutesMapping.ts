import type { I18nVocabTarget } from '##/types/magic/i18n';
import type { AppPath } from '@rtm/shared-types/Next';
import type { ReactElement } from 'react';
import type RoutesKeysUnion from './RoutesKeysUnion';

export type RoutesDefinition<RoutesKeys extends RoutesKeysUnion> = {
  [_ in RoutesKeys]: AppPath;
};

export type RoutesTitles<RoutesKeys extends RoutesKeysUnion> = {
  [_ in RoutesKeys]: I18nVocabTarget;
};

export type WeaklyBindedReactElements<K extends string> = {
  [_ in K]: ReactElement;
};
