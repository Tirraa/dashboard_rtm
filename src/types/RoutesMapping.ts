import { ReactElement } from 'react';
import { I18nVocabAccessInfos } from './I18n';

export type RoutesDefinition<RoutesKeys extends string> = {
  [_ in RoutesKeys]: string;
};

export type RoutesTitles<RoutesKeys extends string> = {
  [_ in RoutesKeys]: I18nVocabAccessInfos;
};

export type RoutesReactElement<RoutesKeys extends string> = {
  [_ in RoutesKeys]: ReactElement;
};
