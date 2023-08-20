type NavDataRoutePathGetter = string;

export type NavDataRouteTitleGetter = () => string;
export type NavDataRoutesTitles = Record<string, NavDataRouteTitleGetter>;

interface AtomicNavDataEntity {
  getTitle: NavDataRouteTitleGetter;
  getPath: NavDataRoutePathGetter;
}

export type EmbeddedEntities = AtomicNavDataEntity[];
export interface NavDataEntity extends AtomicNavDataEntity {
  embeddedEntities?: EmbeddedEntities;
}

export type NavDataEntities = NavDataEntity[];
