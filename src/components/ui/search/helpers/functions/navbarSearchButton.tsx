import type { MutableRefObject } from 'react';

import { TabsTrigger } from '@/components/ui/Tabs';
import { capitalize } from '@/lib/str';

import type { TabValue } from '../consts';

export function doUpdateMemorizedTabValueAndSetTabValue(
  v: TabValue,
  memorizedTabValue: MutableRefObject<TabValue>,
  setTabValue: (v: TabValue) => unknown
) {
  memorizedTabValue.current = v;
  setTabValue(v);
}

export const doBuildTabTrigger = (
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
