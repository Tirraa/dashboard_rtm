import type { SearchDocumentFlag } from '@/lib/pagefind/helpers/search';
import type { I18nVocabTarget } from '@rtm/shared-types/I18n';
import type { Index } from '@rtm/shared-types/Numbers';
import type { AppPath } from '@rtm/shared-types/Next';
import type { ComponentType } from 'react';

import { PilcrowIcon, ReaderIcon, GlobeIcon } from '@radix-ui/react-icons';
import { LayoutDashboardIcon, HomeIcon } from 'lucide-react';
import ROUTES_ROOTS from '##/config/routes';
import { i18ns } from '##/config/i18n';

export const THROTTLE_DELAY = 200;

const allTabValues = ['All', 'Page', 'BlogPost'] as const satisfies SearchDocumentFlag[];

export const navbarSearchBtnProps = {
  quickAccessBtns: {
    /* eslint-disable perfectionist/sort-objects */
    [ROUTES_ROOTS.WEBSITE]: { icon: HomeIcon, i18nTitle: `${i18ns.searchMenuSrOnly}.homepage-access` },
    [ROUTES_ROOTS.BLOG]: { icon: PilcrowIcon, i18nTitle: `${i18ns.searchMenuSrOnly}.blog-access` },
    [ROUTES_ROOTS.DASHBOARD]: { icon: LayoutDashboardIcon, i18nTitle: `${i18ns.searchMenuSrOnly}.dashboard-access` }
    /* eslint-enable perfectionist/sort-objects */
  } satisfies Record<AppPath, QuickAccessBtnMetadatas>,
  banners: {
    /* eslint-disable perfectionist/sort-objects */
    All: { icon: GlobeIcon, i18nTitle: `${i18ns.searchMenuOptions}.all` },
    Page: { icon: ReaderIcon, i18nTitle: `${i18ns.searchMenuOptions}.pages` },
    BlogPost: { icon: PilcrowIcon, i18nTitle: `${i18ns.searchMenuOptions}.blog` }
    /* eslint-enable perfectionist/sort-objects */
  } as const satisfies Record<TabValue, BannersMetadatas>,
  tabInputLabels: {
    /* eslint-disable perfectionist/sort-objects */
    All: `${i18ns.searchMenuOptions}.all` satisfies I18nVocabTarget,
    Page: `${i18ns.searchMenuOptions}.pages` satisfies I18nVocabTarget,
    BlogPost: `${i18ns.searchMenuOptions}.blog` satisfies I18nVocabTarget
    /* eslint-enable perfectionist/sort-objects */
  } as const satisfies Record<TabValue, I18nVocabTarget>,
  tabTriggers: {
    /* eslint-disable perfectionist/sort-objects */
    All: `${i18ns.vocab}.all`,
    Page: `${i18ns.vocab}.pages`,
    BlogPost: `${i18ns.vocab}.blog`
    /* eslint-enable perfectionist/sort-objects */
  } as const satisfies Record<TabValue, I18nVocabTarget>,

  tabValueInitialState: 'All' as const satisfies TabValue,
  allTabValues
} as const;

type IconComponentType<P = { className?: string }> = ComponentType<P>;
export type QuickAccessBtnMetadatas = { i18nTitle: I18nVocabTarget; icon: IconComponentType };
export type BannersMetadatas = { i18nTitle: I18nVocabTarget; icon: IconComponentType };

type TabValue = (typeof allTabValues)[Index];
