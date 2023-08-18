import { NavDataRouteTitleGetter } from '@/app/_types/NavData';
import { ReactElement } from 'react';

export type RoutesDefinition<RoutesKeys extends string> = {
  [Property in RoutesKeys]: string;
};

export type RoutesTitles<RoutesKeys extends string> = {
  [Property in RoutesKeys]: NavDataRouteTitleGetter;
};

export type RoutesReactElement<RoutesKeys extends string> = {
  [Property in RoutesKeys]: ReactElement;
};
