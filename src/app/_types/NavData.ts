type NavDataRoutePathGetter = string;

export type NavDataRouteTitleGetter = () => string;
export type NavDataRoutesTitles = Record<string, NavDataRouteTitleGetter>;

interface AtomicNavDataEntity {
  getTitle: NavDataRouteTitleGetter;
  getPath: NavDataRoutePathGetter;
}

export type embeddedEntities = AtomicNavDataEntity[];
export interface NavDataEntity extends AtomicNavDataEntity {
  embeddedEntities?: embeddedEntities;
}

export type NavDataEntities = NavDataEntity[];
