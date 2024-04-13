import type { I18nVocabTarget } from '@rtm/shared-types/I18n';
import type { Index } from '@rtm/shared-types/Numbers';
import type { AppPath } from '@rtm/shared-types/Next';
import type { ComponentType } from 'react';

import { PilcrowIcon, ReaderIcon, GlobeIcon } from '@radix-ui/react-icons';
import { LayoutDashboardIcon, HomeIcon } from 'lucide-react';
import ROUTES_ROOTS from '##/config/routes';
import { i18ns } from '##/config/i18n';

/* eslint-disable perfectionist/sort-objects */
const bannersObj = {
  all: GlobeIcon,
  pages: ReaderIcon,
  blog: PilcrowIcon
} as const satisfies Record<TabValue, IconComponentType>;
/* eslint-enable perfectionist/sort-objects */

/* eslint-disable perfectionist/sort-objects */
const tabTriggersObj = {
  all: `${i18ns.vocab}.all`,
  pages: `${i18ns.vocab}.pages`,
  blog: `${i18ns.vocab}.blog`
} as const satisfies Record<TabValue, I18nVocabTarget>;
/* eslint-enable perfectionist/sort-objects */

/* eslint-disable perfectionist/sort-objects */
const quickAccessBtnsObj = {
  [ROUTES_ROOTS.WEBSITE]: { icon: HomeIcon, i18nTitle: `${i18ns.searchMenuSrOnly}.homepage-access` },
  [ROUTES_ROOTS.BLOG]: { icon: PilcrowIcon, i18nTitle: `${i18ns.searchMenuSrOnly}.blog-access` },
  [ROUTES_ROOTS.DASHBOARD]: { icon: LayoutDashboardIcon, i18nTitle: `${i18ns.searchMenuSrOnly}.dashboard-access` }
} as const satisfies Record<AppPath, QuickAccessBtnMetadatas>;
/* eslint-enable perfectionist/sort-objects */

export const banners = Object.entries(bannersObj) as [keyof typeof bannersObj, (typeof bannersObj)[keyof typeof bannersObj]][];

export const tabTriggers = Object.entries(tabTriggersObj) as [keyof typeof tabTriggersObj, (typeof tabTriggersObj)[keyof typeof tabTriggersObj]][];

export const quickAccessBtns = Object.entries(quickAccessBtnsObj) as [AppPath, (typeof quickAccessBtnsObj)[keyof typeof quickAccessBtnsObj]][];

export const ALL_TAB_VALUES = ['all', 'pages', 'blog'] as const;

export type TabValue = (typeof ALL_TAB_VALUES)[Index];
type IconComponentType<P = { className?: string }> = ComponentType<P>;
type QuickAccessBtnMetadatas = { i18nTitle: I18nVocabTarget; icon: IconComponentType };
