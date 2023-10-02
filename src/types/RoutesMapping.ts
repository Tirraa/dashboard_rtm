import { ReactElement } from 'react';
import { AppPath } from './Next';
import RoutesKeysUnion from './RoutesKeysUnion';
import { I18nVocabTarget } from './i18n';

export type RoutesDefinition<RoutesKeys extends RoutesKeysUnion> = {
  [_ in RoutesKeys]: AppPath;
};

export type RoutesTitles<RoutesKeys extends RoutesKeysUnion> = {
  [_ in RoutesKeys]: I18nVocabTarget;
};

export type WeaklyBindedReactElements<Keys extends string> = {
  [_ in Keys]: ReactElement;
};
