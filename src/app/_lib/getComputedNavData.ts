import { NavDataEntities, NavDataEntity, NavDataRoutesTitles } from '../_types/NavData';
import RoutesTypesUnion from '../_types/RoutesTypesUnion';

export function getComputedNavData(routes: RoutesTypesUnion, routesTitles: NavDataRoutesTitles): NavDataEntities {
  const computedNavData: NavDataEntities = [];

  for (let k in routes) {
    const currentComputedNavData: NavDataEntity = {
      getPath: routes[k as keyof RoutesTypesUnion],
      getTitle: () => routesTitles[k]()
    };
    computedNavData.push(currentComputedNavData);
  }
  return computedNavData;
}

export default getComputedNavData;
