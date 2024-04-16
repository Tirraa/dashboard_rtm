import type { QuickAccessBtnMetadatas, BannersMetadatas } from '@/config/searchMenu';
import type { SearchDocumentFlag } from '@/lib/pagefind/helpers/search';
import type { I18nVocabTarget } from '@rtm/shared-types/I18n';
import type { MutableRefObject, ReactElement } from 'react';
import type { Index } from '@rtm/shared-types/Numbers';
import type { AppPath } from '@rtm/shared-types/Next';

import { searchDocument } from '@/lib/pagefind/helpers/search';
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

/**
 * @throws
 */
export async function computeAndSetResults(
  debouncedSearchText: string,
  documentType: SearchDocumentFlag,
  setResults: (results: ReactElement[]) => void
) {
  const search = await searchDocument(debouncedSearchText, documentType);
  const searchResults = search.results;
  const results: ReactElement[] = [];

  for (const result of searchResults) {
    const data = await result.data();
    if (!data) continue;

    // {ToDo} Move this into a lib function and config
    const { url } = data;
    if (!url) continue;
    const [prefix, suffix] = ['/server/app', '.html'];
    const cleanedUrl = url.replace(new RegExp(`^${prefix}`), '').replace(new RegExp(`${suffix}$`), '');

    const metaTitle = data.meta.title;
    const excerpt = data.excerpt;

    results.push(<Result metaTitle={metaTitle} excerpt={excerpt} href={cleanedUrl} key={result.id} />);
  }

  setResults(results);
}
