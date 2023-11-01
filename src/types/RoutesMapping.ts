import type { ReactElement } from 'react';
import type { AppPath } from './Next';
import type RoutesKeysUnion from './RoutesKeysUnion';
import type { I18nVocabTarget } from './i18n';

export type RoutesDefinition<RoutesKeys extends RoutesKeysUnion> = {
  [_ in RoutesKeys]: AppPath;
};

export type RoutesTitles<RoutesKeys extends RoutesKeysUnion> = {
  [_ in RoutesKeys]: I18nVocabTarget;
};

export type WeaklyBindedReactElements<K extends string> = {
  [_ in K]: ReactElement;
};
