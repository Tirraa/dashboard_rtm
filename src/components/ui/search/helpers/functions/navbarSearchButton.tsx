import type { QuickAccessBtnMetadatas, BannersMetadatas } from '@/config/searchMenu';
import type { FocusEventHandler, MutableRefObject, RefObject } from 'react';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { I18nVocabTarget } from '@rtm/shared-types/I18n';
import type { Index } from '@rtm/shared-types/Numbers';
import type { AppPath } from '@rtm/shared-types/Next';

import { TabsTrigger } from '@/components/ui/Tabs';
import { capitalize } from '@/lib/str';

export function doUpdateMemorizedTabValueAndSetTabValue<TabValue extends string>(
  v: TabValue,
  memorizedTabValue: MutableRefObject<string>,
  setTabValue: (v: TabValue) => unknown
) {
  memorizedTabValue.current = v;
  setTabValue(v);
}

export const doBuildTabTrigger = <TabValue extends string>(
  tabValue: TabValue,
  title: string,
  memorizedTabValue: MutableRefObject<TabValue>,
  setTabValue: (v: TabValue) => unknown
) => (
  <TabsTrigger
    onFocusCapture={(e) => {
      if (memorizedTabValue.current) {
        e.preventDefault();
        setTabValue(memorizedTabValue.current);
      }
    }}
    onFocus={(e) => {
      e.preventDefault();
      doUpdateMemorizedTabValueAndSetTabValue(tabValue, memorizedTabValue, setTabValue);
    }}
    className="search-menu-tabslist-item w-full flex-1 font-semibold hover:bg-primary hover:text-white max-lg:h-10 lg:w-fit"
    value={tabValue}
  >
    {capitalize(title)}
  </TabsTrigger>
);

export const createNavbarSearchButtonProps = <
  AllTabValues extends readonly string[],
  TabTriggers extends Record<AllTabValues[Index], I18nVocabTarget>,
  Banners extends Record<AllTabValues[Index], BannersMetadatas>,
  QuickAccessBtns extends Record<AppPath, QuickAccessBtnMetadatas>
>({
  quickAccessBtns,
  allTabValues,
  tabTriggers,
  banners
}: {
  quickAccessBtns: QuickAccessBtns;
  allTabValues: AllTabValues;
  tabTriggers: TabTriggers;
  banners: Banners;
}) =>
  ({
    tabTriggers: Object.entries(tabTriggers) as [keyof typeof tabTriggers, (typeof tabTriggers)[keyof typeof tabTriggers]][],
    quickAccessBtns: Object.entries(quickAccessBtns) as [AppPath, QuickAccessBtnMetadatas][],
    banners: Object.entries(banners) as [keyof typeof banners, BannersMetadatas][],
    allTabValues
  }) as const;

export function buildResultOnFocus(
  currentElementIndex: Index,
  maxIndex: Index,
  resultsContainerRef: RefObject<MaybeNull<HTMLDivElement>>
): FocusEventHandler<HTMLAnchorElement> {
  // eslint-disable-next-line no-magic-numbers
  if (currentElementIndex === 0) {
    return () => {
      const maybeContainer = resultsContainerRef.current;
      if (maybeContainer === null) return;
      // eslint-disable-next-line no-magic-numbers
      maybeContainer.scrollTo(0, 0);
    };
  }

  if (currentElementIndex === maxIndex) {
    return () => {
      const maybeContainer = resultsContainerRef.current;
      if (maybeContainer === null) return;
      // eslint-disable-next-line no-magic-numbers
      maybeContainer.scrollTo(0, maybeContainer.scrollHeight);
    };
  }

  return (e) => {
    const maybeContainer = resultsContainerRef.current;
    const { target } = e;
    if (maybeContainer === null) return;
    target.scrollIntoView({ block: 'end' });
    // eslint-disable-next-line no-magic-numbers
    maybeContainer.scrollTo(0, maybeContainer.scrollTop + 15);
  };
}
