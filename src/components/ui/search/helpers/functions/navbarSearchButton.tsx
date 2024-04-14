import type { QuickAccessBtnMetadatas, BannersMetadatas } from '@/config/searchMenu';
import type { I18nVocabTarget } from '@rtm/shared-types/I18n';
import type { MutableRefObject, ReactElement } from 'react';
import type { Index } from '@rtm/shared-types/Numbers';
import type { AppPath } from '@rtm/shared-types/Next';

import { TabsTrigger } from '@/components/ui/Tabs';
import { capitalize } from '@/lib/str';

import Result from '../../Result';

export function doUpdateMemorizedTabValueAndSetTabValue(v: string, memorizedTabValue: MutableRefObject<string>, setTabValue: (v: string) => unknown) {
  memorizedTabValue.current = v;
  setTabValue(v);
}

export const doBuildTabTrigger = (
  tabValue: string,
  title: string,
  memorizedTabValue: MutableRefObject<string>,
  setTabValue: (v: string) => unknown
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
export async function computeAndSetResults(debouncedSearchText: string, setResults: (results: ReactElement[]) => void) {
  const search = await window.pagefind.search(debouncedSearchText);

  // {ToDo} Type this
  const searchResults: any[] = search.results;
  const results: ReactElement[] = [];

  for (const result of searchResults) {
    const data = await result.data();
    if (!data) continue;

    // {ToDo} WTF
    const { raw_url } = data;
    if (!raw_url) continue;
    const [prefix, suffix] = ['/server/app', '.html'];
    const cleanedUrl = raw_url.replace(new RegExp(`^${prefix}`), '').replace(new RegExp(`${suffix}$`), '');

    // {ToDo} Type this
    const yoloData = data as any;
    const metaTitle = yoloData.meta.title as string;
    const excerpt = yoloData.excerpt as string;

    results.push(<Result key={(result as any).id} metaTitle={metaTitle} excerpt={excerpt} href={cleanedUrl} className="mt-2" result={result} />);
  }

  setResults(results);
}
