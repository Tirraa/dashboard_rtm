import { NavDataRouteTitleGetter } from '@/app/_types/NavData';
import { ReactElement } from 'react';

export type RouteDefinition<RouteNames extends string> = {
  [Property in RouteNames]: string;
};

export type RouteTitles<RouteNames extends string> = {
  [Property in RouteNames]: NavDataRouteTitleGetter;
};

export type RouteReactElement<RouteNames extends string> = {
  [Property in RouteNames]: ReactElement;
};
