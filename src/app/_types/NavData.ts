type NavDataRoutePathGetter = string;

export type NavDataRouteTitleGetter = () => string;
export type NavDataRoutesTitles = Record<string, NavDataRouteTitleGetter>;

export type NavDataEntity = { getTitle: NavDataRouteTitleGetter; getPath: NavDataRoutePathGetter };
export type NavDataEntities = NavDataEntity[];
