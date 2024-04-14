import type { QuickAccessBtnMetadatas, BannersMetadatas } from '@/config/searchMenu';
import type { I18nVocabTarget } from '@rtm/shared-types/I18n';
import type { MutableRefObject, ReactElement } from 'react';
import type { Index } from '@rtm/shared-types/Numbers';
import type { AppPath } from '@rtm/shared-types/Next';

import { TabsTrigger } from '@/components/ui/Tabs';
import { capitalize } from '@/lib/str';

import Result from '../../Result';

// {ToDo} WTF
const __fakeResults = [
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} href={'#osef'} key={'stupid'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid1'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid2'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid3'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid4'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid5'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid6'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid7'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid8'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid9'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid10'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid11'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid12'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid13'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid14'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid15'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid16'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid17'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid18'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid19'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid20'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid21'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid22'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid23'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid24'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid25'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid26'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid27'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid28'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid29'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid30'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid31'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid32'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid33'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid34'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid35'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid36'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid37'} href={'#osef'} />,
  <Result metaTitle={'metaTitle'} excerpt={'excerpt'} key={'stupid38'} href={'#osef'} />
];

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
  // {ToDo} Find a better way to handle this on its root
  if (process.env.NODE_ENV === 'development') {
    setResults(__fakeResults);
    return;
  }

  // {ToDo} Type this
  // @ts-ignore
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

    results.push(<Result key={(result as any).id} metaTitle={metaTitle} excerpt={excerpt} href={cleanedUrl} />);
  }

  setResults(results);
}
