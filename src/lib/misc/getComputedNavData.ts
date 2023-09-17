import { DropdownsConfig, NavDataEntities, NavDataEntity } from '@/types/NavData';
import { AppPath } from '@/types/Next';
import RoutesKeysUnion from '@/types/RoutesKeysUnion';
import { I18nVocabTarget } from '@/types/i18n';

// {ToDo} Recursive embeddedEntities?
export function getComputedNavData<ScopedRoutesK extends RoutesKeysUnion>(
  routes: Record<ScopedRoutesK, AppPath>,
  routesTitles: Record<ScopedRoutesK, I18nVocabTarget>,
  dropdownConfig?: DropdownsConfig<ScopedRoutesK>
): NavDataEntities {
  const computedNavData: NavDataEntities = Object.keys(routes).map((k) => {
    const k2 = k as ScopedRoutesK;
    const currentEntity: NavDataEntity = {
      path: routes[k2],
      i18nTitle: routesTitles[k2],
      ...(dropdownConfig?.[k2] ? { embeddedEntities: [...(dropdownConfig[k2] as NavDataEntities)] } : {})
    };
    return currentEntity;
  });
  return computedNavData;
}

export default getComputedNavData;
