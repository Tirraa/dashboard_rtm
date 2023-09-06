import { DropdownsConfig, NavDataEntities, NavDataEntity, NavDataRoutesTitles } from '@/types/NavData';
import RoutesTypesUnion, { RoutesTypesUnionKey } from '@/types/RoutesTypesUnion';

// {ToDo} Recursive embeddedEntities?
export function getComputedNavData(
  routes: RoutesTypesUnion,
  routesTitles: NavDataRoutesTitles,
  dropdownConfig?: DropdownsConfig<RoutesTypesUnionKey>
): NavDataEntities {
  const computedNavData: NavDataEntities = Object.keys(routes).map((k) => {
    const k2 = k as RoutesTypesUnionKey;
    const currentEntity: NavDataEntity = {
      path: routes[k2],
      i18nTitle: routesTitles[k2],
      ...(dropdownConfig?.[k2] ? { embeddedEntities: [...dropdownConfig[k2]] } : {})
    };
    return currentEntity;
  });
  return computedNavData;
}

export default getComputedNavData;
