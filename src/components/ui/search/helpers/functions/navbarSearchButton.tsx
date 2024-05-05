import type { FocusEventHandler, MutableRefObject, ReactElement, RefObject } from 'react';
import type { QuickAccessBtnMetadatas, BannersMetadatas } from '@/config/searchMenu';
import type { SearchDocumentFlag } from '@/lib/pagefind/helpers/search';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { I18nVocabTarget } from '@rtm/shared-types/I18n';
import type { Index } from '@rtm/shared-types/Numbers';
import type { AppPath } from '@rtm/shared-types/Next';

import { searchDocument, getCleanedURL } from '@/lib/pagefind/helpers/search';
import { TabsTrigger } from '@/components/ui/Tabs';
import { capitalize } from '@/lib/str';

import Result from '../../Result';

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

function buildResultOnFocus(
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

/**
 * @throws
 */
export async function computeAndSetResults(
  debouncedSearchText: string,
  documentType: SearchDocumentFlag,
  resultsContainerRef: RefObject<MaybeNull<HTMLDivElement>>,
  setResults: (results: ReactElement[]) => void
) {
  const search = await searchDocument(debouncedSearchText, documentType);
  const searchResults = search.results;
  const results: ReactElement[] = [];

  // {ToDo} Optimize this lmao
  // eslint-disable-next-line promise/catch-or-return
  const mountedData = await Promise.all(searchResults.map((r) => r.data()));

  for (let i = 0; i < searchResults.length; i++) {
    const data = mountedData[i];
    if (!data) continue;

    const { url } = data;
    if (!url) continue;

    const cleanedUrl = getCleanedURL(url);
    const metaTitle = data.meta.title;
    const excerpt = data.excerpt;

    // eslint-disable-next-line no-magic-numbers
    const onFocus = buildResultOnFocus(i, searchResults.length - 1, resultsContainerRef);

    results.push(
      <Result
        navigationMenuItemKey={String(i)}
        key={searchResults[i].id}
        metaTitle={metaTitle}
        onFocus={onFocus}
        excerpt={excerpt}
        href={cleanedUrl}
      />
    );
  }

  setResults(results);
}
