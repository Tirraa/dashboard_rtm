import { NavDataRouteTitleGetter } from '@/_types/NavData';
import { ReactElement } from 'react';

export type RoutesDefinition<RoutesKeys extends string> = {
  [_ in RoutesKeys]: string;
};

export type RoutesTitles<RoutesKeys extends string> = {
  [_ in RoutesKeys]: NavDataRouteTitleGetter;
};

export type RoutesReactElement<RoutesKeys extends string> = {
  [_ in RoutesKeys]: ReactElement;
};
