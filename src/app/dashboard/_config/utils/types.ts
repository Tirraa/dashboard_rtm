import { ReactElement } from 'react';

export interface DashboardRoutes {
  BASE_PAGE: string;
  FOO_PAGE: string;
  BAR_PAGE: string;
}

export type DashboardRoutesTitles = {
  [Property in keyof DashboardRoutes]: () => string;
};

export type DashboardRoutesSidebarReactElements = {
  [Property in keyof DashboardRoutes]: ReactElement;
};
