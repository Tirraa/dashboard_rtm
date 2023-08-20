import { NavDataEntities, NavDataEntity, NavDataRoutesTitles } from '../_types/NavData';
import RoutesTypesUnion, { RoutesSumType } from '../_types/RoutesTypesUnion';

type NavDataEntitiesRec = Record<RoutesSumType, NavDataEntity>;
export function getComputedNavData(routes: RoutesTypesUnion, routesTitles: NavDataRoutesTitles): NavDataEntities {
  const generatedRecord: Partial<NavDataEntitiesRec> = {};
  const computedNavData: NavDataEntities = [];

  for (let k in routes) {
    generatedRecord[k as keyof NavDataEntitiesRec] = {
      getPath: routes[k as keyof RoutesTypesUnion],
      getTitle: () => routesTitles[k]()
    };
  }

  // * ... {ToDo} Merge dropdowns config

  Object.entries(generatedRecord).forEach(([_, navDataEntity]) => {
    computedNavData.push(navDataEntity);
  });
  return computedNavData;
}

export default getComputedNavData;
