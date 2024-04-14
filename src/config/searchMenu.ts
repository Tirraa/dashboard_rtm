import type { I18nVocabTarget } from '@rtm/shared-types/I18n';
import type { Index } from '@rtm/shared-types/Numbers';
import type { AppPath } from '@rtm/shared-types/Next';
import type { ComponentType } from 'react';

import { PilcrowIcon, ReaderIcon, GlobeIcon } from '@radix-ui/react-icons';
import { LayoutDashboardIcon, HomeIcon } from 'lucide-react';
import ROUTES_ROOTS from '##/config/routes';
import { i18ns } from '##/config/i18n';

const allTabValues = ['all', 'pages', 'blog'] as const;

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
    all: { icon: GlobeIcon, i18nTitle: `${i18ns.searchMenuOptions}.all` },
    pages: { icon: ReaderIcon, i18nTitle: `${i18ns.searchMenuOptions}.pages` },
    blog: { icon: PilcrowIcon, i18nTitle: `${i18ns.searchMenuOptions}.blog` }
    /* eslint-enable perfectionist/sort-objects */
  } as const satisfies Record<AllTabValues, BannersMetadatas>,
  tabInputLabels: {
    /* eslint-disable perfectionist/sort-objects */
    all: `${i18ns.searchMenuOptions}.all` satisfies I18nVocabTarget,
    pages: `${i18ns.searchMenuOptions}.pages` satisfies I18nVocabTarget,
    blog: `${i18ns.searchMenuOptions}.blog` satisfies I18nVocabTarget
    /* eslint-enable perfectionist/sort-objects */
  } as const satisfies Record<AllTabValues, I18nVocabTarget>,
  tabTriggers: {
    /* eslint-disable perfectionist/sort-objects */
    all: `${i18ns.vocab}.all`,
    pages: `${i18ns.vocab}.pages`,
    blog: `${i18ns.vocab}.blog`
    /* eslint-enable perfectionist/sort-objects */
  } as const satisfies Record<AllTabValues, I18nVocabTarget>,

  tabValueInitialState: 'all' as const satisfies AllTabValues,
  allTabValues
} as const;

type IconComponentType<P = { className?: string }> = ComponentType<P>;
export type QuickAccessBtnMetadatas = { i18nTitle: I18nVocabTarget; icon: IconComponentType };
export type BannersMetadatas = { i18nTitle: I18nVocabTarget; icon: IconComponentType };

type AllTabValues = (typeof allTabValues)[Index];
