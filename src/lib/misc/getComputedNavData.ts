import type { DropdownsConfig, NavDataEntities, NavDataEntity } from '@/types/NavData';
import type { I18nVocabTarget } from '@rtm/shared-types/I18n';
import type RoutesKeysUnion from '@/types/RoutesKeysUnion';
import type { AppPath } from '@rtm/shared-types/Next';

// {ToDo} Recursive embeddedEntities
// https://github.com/Tirraa/dashboard_rtm/issues/132
function getComputedNavData<ScopedRoutesK extends RoutesKeysUnion>(
  routes: Record<ScopedRoutesK, AppPath>,
  routesTitles: Record<ScopedRoutesK, I18nVocabTarget>,
  dropdownConfig?: DropdownsConfig<ScopedRoutesK>
): NavDataEntities {
  const computedNavData: NavDataEntities = Object.keys(routes).map((k) => {
    const k2 = k as ScopedRoutesK;
    const currentEntity: NavDataEntity = {
      i18nTitle: routesTitles[k2],
      path: routes[k2],
      ...(dropdownConfig?.[k2] ? { embeddedEntities: [...(dropdownConfig[k2] as NavDataEntities)] } : {})
    };
    return currentEntity;
  });
  return computedNavData;
}

export default getComputedNavData;
