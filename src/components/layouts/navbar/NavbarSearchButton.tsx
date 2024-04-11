'use client';

import type { ChangeEventHandler, FunctionComponent, ComponentType } from 'react';
import type { I18nVocabTarget } from '@rtm/shared-types/I18n';
import type { Index } from '@rtm/shared-types/Numbers';

import { MagnifyingGlassIcon, ChevronRightIcon, ChevronLeftIcon, PilcrowIcon, ReaderIcon, GlobeIcon } from '@radix-ui/react-icons';
import { DialogContent, DialogTrigger, DialogHeader, Dialog } from '@/components/ui/Dialog';
import { TabsContent, TabsTrigger, TabsList, Tabs } from '@/components/ui/Tabs';
import useIsLargeScreen from '@/components/hooks/useIsLargeScreen';
import { useCallback, useState, Fragment, useRef } from 'react';
import { LayoutDashboardIcon, HomeIcon } from 'lucide-react';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { getClientSideI18n } from '@/i18n/client';
import { CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import ROUTES_ROOTS from '##/config/routes';
import { useDebounce } from 'use-debounce';
import { i18ns } from '##/config/i18n';
import { capitalize } from '@/lib/str';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

interface NavbarSearchButtonProps {}

const TAB_VALUE_INITIAL_STATE: TabValue = 'all';
const SEARCH_TEXT_INITIAL_STATE = '';
const ALL_TAB_VALUES = ['all', 'pages', 'blog'] as const;

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

const banners = Object.entries(bannersObj) as [keyof typeof bannersObj, (typeof bannersObj)[keyof typeof bannersObj]][];

const tabTriggers = Object.entries(tabTriggersObj) as [keyof typeof tabTriggersObj, (typeof tabTriggersObj)[keyof typeof tabTriggersObj]][];

const NavbarSearchButton: FunctionComponent<NavbarSearchButtonProps> = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>(SEARCH_TEXT_INITIAL_STATE);
  const [tabValue, setTabValue] = useState<TabValue>(TAB_VALUE_INITIAL_STATE);
  const inputFieldRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const [debouncedSearchText, setDebouncedSearchText] = useDebounce(searchText, 200);
  const isLargeScreen = useIsLargeScreen();

  const globalT = getClientSideI18n();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => setSearchText(e.target.value);

  const buildTabTrigger = useCallback(
    (tabValue: TabValue, i18nTitle: I18nVocabTarget) => {
      return (
        <TabsTrigger
          className="search-menu-tabslist-item w-full flex-1 font-semibold hover:bg-primary hover:text-white max-lg:h-10 lg:w-fit"
          value={tabValue}
        >
          {capitalize(globalT(i18nTitle))}
        </TabsTrigger>
      );
    },
    [globalT]
  );

  const buildBanner = useCallback(
    (bannerTabValue: TabValue, __Icon: IconComponentType, pos: EBannerPosition) => {
      const title = globalT(`${i18ns.searchMenuOptions}.${bannerTabValue}`);

      return (
        <button
          className={cn(
            'search-menu-banner flex w-full flex-1 cursor-pointer justify-between bg-accent font-semibold transition-colors hover:bg-primary hover:text-white focus:bg-primary focus:text-white focus:outline-none [&>svg]:hover:border-transparent [&>svg]:focus:border-transparent [&>svg]:dark:hover:border-transparent [&>svg]:dark:focus:border-transparent',
            { 'rounded-t-md': pos === EBannerPosition.FIRST },
            { 'rounded-b-md': pos === EBannerPosition.LAST },
            {
              'pointer-events-none opacity-50 hover:cursor-default dark:opacity-75 [&>svg]:border-transparent [&>svg]:dark:border-transparent':
                tabValue === bannerTabValue
            }
          )}
          onClick={() => setTabValue(bannerTabValue)}
          disabled={tabValue === bannerTabValue}
          aria-label={title}
        >
          <__Icon className="flex h-full max-h-full min-h-10 w-auto min-w-10 max-w-[10%] rounded-md border border-black border-transparent dark:border-white" />
          <span className="search-menu-banner-span my-auto flex-1 text-left max-sm:text-base">{title}</span>
        </button>
      );
    },
    [tabValue, globalT]
  );

  const prevScreenBtn = (
    <button
      onClick={() => {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const indexOf = ALL_TAB_VALUES.indexOf(tabValue) - 1;
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const newIdx = indexOf < 0 ? ALL_TAB_VALUES.length - 1 : indexOf;
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        setTabValue(ALL_TAB_VALUES[newIdx]);
      }}
      className="search-menu-prev-next-btn sticky top-[calc(50%-1rem)] h-fit scale-125 self-center rounded-full bg-accent transition-all hover:scale-150 hover:bg-primary hover:text-white focus:scale-150 focus:bg-primary focus:text-white dark:opacity-75 hover:dark:opacity-100 dark:focus:opacity-100"
      aria-label={globalT(`${i18ns.searchMenuSrOnly}.prev-screen`)}
    >
      <ChevronLeftIcon className="search-menu-prev-next-icon max-lg:hidden" />
    </button>
  );

  const nextScreenBtn = (
    <button
      className="search-menu-prev-next-btn sticky top-[calc(50%-1rem)] h-fit scale-125 self-center rounded-full bg-accent transition-all hover:scale-150 hover:bg-primary hover:text-white focus:scale-150 focus:bg-primary focus:text-white dark:opacity-75 hover:dark:opacity-100 focus:dark:opacity-100"
      onClick={() => {
        const indexOf = ALL_TAB_VALUES.indexOf(tabValue);
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        setTabValue(ALL_TAB_VALUES[(indexOf + 1) % ALL_TAB_VALUES.length]);
      }}
      aria-label={globalT(`${i18ns.searchMenuSrOnly}.next-screen`)}
    >
      <ChevronRightIcon className="search-menu-prev-next-icon max-lg:hidden" />
    </button>
  );

  const cardDefaultViewFooter = (
    <CardFooter className="mt-4 flex w-full flex-wrap justify-center gap-2 p-0 lg:gap-4">
      <div className="w-fit items-center justify-center max-lg:w-full max-lg:flex-1 lg:flex">
        <Link
          className="flex h-fit flex-col items-center justify-center rounded-md bg-accent p-4 font-semibold transition-colors hover:bg-primary hover:text-white focus:bg-primary focus:text-white focus:outline-none lg:min-w-[200px]"
          onClick={() => setIsOpened(false)}
          href={ROUTES_ROOTS.WEBSITE}
        >
          <HomeIcon className="h-10 w-10" />
        </Link>
      </div>
      <div className="w-fit items-center justify-center max-lg:w-full max-lg:flex-1 lg:flex">
        <Link
          className="flex h-fit flex-col items-center justify-center rounded-md bg-accent p-4 font-semibold transition-colors hover:bg-primary hover:text-white focus:bg-primary focus:text-white focus:outline-none lg:min-w-[200px]"
          onClick={() => setIsOpened(false)}
          href={ROUTES_ROOTS.BLOG}
        >
          <PilcrowIcon className="h-10 w-10" />
        </Link>
      </div>
      <div className="w-fit items-center justify-center max-lg:w-full max-lg:flex-1 lg:flex">
        <Link
          className="flex h-fit flex-col items-center justify-center rounded-md bg-accent p-4 font-semibold transition-colors hover:bg-primary hover:text-white focus:bg-primary focus:text-white focus:outline-none lg:min-w-[200px]"
          onClick={() => setIsOpened(false)}
          href={ROUTES_ROOTS.DASHBOARD}
        >
          <LayoutDashboardIcon className="h-10 w-10" />
        </Link>
      </div>
    </CardFooter>
  );

  const defaultView = (
    <>
      {banners.map(([category, icon], index) => (
        <Fragment key={category}>
          {buildBanner(
            category,
            icon,
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            index === 0 ? EBannerPosition.FIRST : index === banners.length - 1 ? EBannerPosition.LAST : EBannerPosition.MIDDLE
          )}
        </Fragment>
      ))}
      {cardDefaultViewFooter}
    </>
  );

  return (
    <Dialog
      onOpenChange={(_isOpened: boolean) => {
        setIsOpened(_isOpened);
        setTabValue(TAB_VALUE_INITIAL_STATE);
        setSearchText(SEARCH_TEXT_INITIAL_STATE);
        setDebouncedSearchText(SEARCH_TEXT_INITIAL_STATE);
      }}
      open={isOpened}
    >
      <DialogTrigger aria-label={globalT(`${i18ns.navbar}.sr-only.open-search-menu`)} className="h-full w-4">
        <MagnifyingGlassIcon />
      </DialogTrigger>
      <DialogContent
        onAnimationEnd={() => {
          if (!isOpened) return;
          const inputFieldInstance = getRefCurrentPtr(inputFieldRef);
          if (!inputFieldInstance) return;
          inputFieldInstance.focus();
        }}
        className="search-menu-dialog flex h-fit max-h-[90vh] min-h-[90vh] w-full max-w-[90vw] overflow-y-auto overflow-x-hidden"
        closeButtonI18nTitle={`${i18ns.searchMenuSrOnly}.close-search-menu`}
        closeButtonClassName="search-menu-close-btn"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {prevScreenBtn}
        <Tabs
          className="search-menu-gap-y flex w-full flex-col lg:px-5"
          orientation={isLargeScreen ? 'horizontal' : 'vertical'}
          onValueChange={(v) => setTabValue(v as TabValue)}
          value={tabValue}
        >
          <DialogHeader className="search-menu-gap-y">
            <TabsList className="mx-auto flex h-fit w-full flex-col flex-wrap lg:flex-row" loop>
              {tabTriggers.map(([category, i18nTitle]) => (
                <Fragment key={`tab-${category}`}>{buildTabTrigger(category, i18nTitle)}</Fragment>
              ))}
            </TabsList>
            <div className="flex w-full flex-col" style={{ marginTop: '0' }}>
              <Label htmlFor="modal-search" className="sr-only">
                {globalT(`${i18ns.searchMenuOptions}.${tabValue}`)}
              </Label>
              <Input
                placeholder={`${capitalize(globalT(`${i18ns.vocab}.start-typing`))}…`}
                value={isOpened ? searchText : debouncedSearchText}
                className="search-menu-input"
                onChange={onChange}
                ref={inputFieldRef}
                id="modal-search"
                type="text"
              />
            </div>
          </DialogHeader>
          <div
            className={cn("flex-1 rounded-md after:block after:h-10 after:content-['']", {
              'border border-input': debouncedSearchText !== SEARCH_TEXT_INITIAL_STATE
            })}
          >
            <TabsContent
              className={cn('mt-0 flex h-full max-h-full w-full flex-col items-center', {
                hidden: tabValue !== 'all'
              })}
              value={'all' satisfies TabValue}
              tabIndex={-1}
            >
              {debouncedSearchText === SEARCH_TEXT_INITIAL_STATE ? defaultView : debouncedSearchText}
            </TabsContent>
            <TabsContent
              className={cn('mt-0 flex h-full max-h-full w-full flex-col items-center', {
                hidden: tabValue !== 'pages'
              })}
              value={'pages' satisfies TabValue}
              tabIndex={-1}
            >
              {debouncedSearchText === SEARCH_TEXT_INITIAL_STATE ? defaultView : debouncedSearchText}
            </TabsContent>
            <TabsContent
              className={cn('mt-0 flex h-full max-h-full w-full flex-col items-center', {
                hidden: tabValue !== 'blog'
              })}
              value={'blog' satisfies TabValue}
              tabIndex={-1}
            >
              {debouncedSearchText === SEARCH_TEXT_INITIAL_STATE ? defaultView : debouncedSearchText}
            </TabsContent>
          </div>
        </Tabs>
        {nextScreenBtn}
      </DialogContent>
    </Dialog>
  );
};

export default NavbarSearchButton;

type TabValue = (typeof ALL_TAB_VALUES)[Index];
type IconComponentType<P = { className?: string }> = ComponentType<P>;

enum EBannerPosition {
  FIRST,
  MIDDLE,
  LAST
}
