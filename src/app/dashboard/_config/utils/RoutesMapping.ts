import { NavDataRouteTitleGetter } from '@/app/_types/NavData';
import { ReactElement } from 'react';

export type DashboardRoutes = {
  BASE_PAGE: string;
  FOO_PAGE: string;
  BAR_PAGE: string;
};

export type DashboardRoutesTitles = {
  [Property in keyof DashboardRoutes]: NavDataRouteTitleGetter;
};

export type DashboardRoutesSidebarReactElements = {
  [Property in keyof DashboardRoutes]: ReactElement;
};
