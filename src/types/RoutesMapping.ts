import { ReactElement } from 'react';
import { I18nVocabTarget } from './i18n';

export type RoutesDefinition<RoutesKeys extends string> = {
  [_ in RoutesKeys]: string;
};

export type RoutesTitles<RoutesKeys extends string> = {
  [_ in RoutesKeys]: I18nVocabTarget;
};

export type RoutesReactElement<RoutesKeys extends string> = {
  [_ in RoutesKeys]: ReactElement;
};
