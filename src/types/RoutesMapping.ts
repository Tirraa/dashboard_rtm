import { ReactElement } from 'react';
import { RoutesEnumKey } from './Next';
import { I18nVocabTarget } from './i18n';

export type RoutesDefinition<RoutesKeys extends RoutesEnumKey> = {
  [_ in RoutesKeys]: string;
};

export type RoutesTitles<RoutesKeys extends RoutesEnumKey> = {
  [_ in RoutesKeys]: I18nVocabTarget;
};

export type RoutesReactElement<RoutesKeys extends RoutesEnumKey> = {
  [_ in RoutesKeys]: ReactElement;
};
