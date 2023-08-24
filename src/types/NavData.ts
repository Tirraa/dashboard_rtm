type NavDataRouteTitle = string;

export type NavDataRouteTitleGetter = () => NavDataRouteTitle;
export type NavDataRoutesTitles = Record<NavDataRouteTitle, NavDataRouteTitleGetter>;

interface AtomicNavDataEntity {
  getTitle: NavDataRouteTitleGetter;
  path: NavDataRouteTitle;
}

export type EmbeddedEntities = AtomicNavDataEntity[];
export interface NavDataEntity extends AtomicNavDataEntity {
  embeddedEntities?: EmbeddedEntities;
}

export type NavDataEntities = NavDataEntity[];

export type DropdownsConfig<T extends string> = Partial<Record<T, NavDataEntities>>;
