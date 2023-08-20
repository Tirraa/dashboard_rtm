import { DropdownsConfig } from '../_types/DropdownConfig';
import { NavDataEntities, NavDataEntity, NavDataRoutesTitles } from '../_types/NavData';
import RoutesTypesUnion from '../_types/RoutesTypesUnion';

export function getComputedNavData(
  routes: RoutesTypesUnion,
  routesTitles: NavDataRoutesTitles,
  dropDownConfig?: DropdownsConfig<keyof RoutesTypesUnion>
): NavDataEntities {
  const computedNavData: NavDataEntities = Object.keys(routes).map((k) => {
    const k2 = k as keyof RoutesTypesUnion;
    const currentEntity: NavDataEntity = {
      getPath: routes[k2],
      getTitle: () => routesTitles[k2](),
      ...(dropDownConfig && dropDownConfig[k2] ? { embeddedEntities: [...dropDownConfig[k2]] } : {})
    };
    return currentEntity;
  });
  return computedNavData;
}

export default getComputedNavData;
