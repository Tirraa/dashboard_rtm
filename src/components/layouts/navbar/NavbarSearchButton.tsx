'use client';

import type { KeyboardEvent as ReactKeyboardEvent, ChangeEventHandler, FunctionComponent, ComponentType } from 'react';
import type { I18nVocabTarget } from '@rtm/shared-types/I18n';
import type { Index } from '@rtm/shared-types/Numbers';
import type { AppPath } from '@rtm/shared-types/Next';

import { MagnifyingGlassIcon, ChevronRightIcon, ChevronLeftIcon, PilcrowIcon, ReaderIcon, GlobeIcon } from '@radix-ui/react-icons';
import { DialogContent, DialogTrigger, DialogHeader, Dialog } from '@/components/ui/Dialog';
import { TabsContent, TabsTrigger, TabsList, Tabs } from '@/components/ui/Tabs';
import useIsLargeScreen from '@/components/hooks/useIsLargeScreen';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { useCallback, useState, Fragment, useRef } from 'react';
import { LayoutDashboardIcon, HomeIcon } from 'lucide-react';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { getClientSideI18n } from '@/i18n/client';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import ROUTES_ROOTS from '##/config/routes';
import { useDebounce } from 'use-debounce';
import { i18ns } from '##/config/i18n';
import { capitalize } from '@/lib/str';
import { cn } from '@/lib/tailwind';

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

/* eslint-disable perfectionist/sort-objects */
const quickAccessBtnsObj = {
  [ROUTES_ROOTS.WEBSITE]: HomeIcon,
  [ROUTES_ROOTS.BLOG]: PilcrowIcon,
  [ROUTES_ROOTS.DASHBOARD]: LayoutDashboardIcon
} as const satisfies Record<AppPath, IconComponentType>;
/* eslint-enable perfectionist/sort-objects */

const banners = Object.entries(bannersObj) as [keyof typeof bannersObj, (typeof bannersObj)[keyof typeof bannersObj]][];

const tabTriggers = Object.entries(tabTriggersObj) as [keyof typeof tabTriggersObj, (typeof tabTriggersObj)[keyof typeof tabTriggersObj]][];

const quickAccessBtns = Object.entries(quickAccessBtnsObj) as [AppPath, (typeof quickAccessBtnsObj)[keyof typeof quickAccessBtnsObj]][];

const NavbarSearchButton: FunctionComponent<NavbarSearchButtonProps> = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>(SEARCH_TEXT_INITIAL_STATE);
  const [tabValue, setTabValue] = useState<TabValue>(TAB_VALUE_INITIAL_STATE);
  const inputFieldRef = useRef<HTMLInputElement>(null);
  const prevScreenBtnRef = useRef<HTMLButtonElement>(null);
  const nextScreenBtnRef = useRef<HTMLButtonElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const [debouncedSearchText, setDebouncedSearchText] = useDebounce(searchText, 200);
  const isLargeScreen = useIsLargeScreen();
  const memorizedTabValue = useRef<TabValue>(tabValue);

  const globalT = getClientSideI18n();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => setSearchText(e.target.value);

  const updateMemorizedTabValueAndSetTabValue = useCallback((v: TabValue) => {
    memorizedTabValue.current = v;
    setTabValue(v);
  }, []);

  const quickMenuLeftCustomHandler = useCallback((e: ReactKeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'ArrowLeft') {
      const prevScreenBtnInstance = getRefCurrentPtr(prevScreenBtnRef);
      if (!prevScreenBtnInstance) return;
      e.preventDefault();
      prevScreenBtnInstance.focus();
    }
  }, []);

  const quickMenuRightCustomHandler = useCallback((e: ReactKeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'ArrowRight') {
      const nextScreenBtnInstance = getRefCurrentPtr(nextScreenBtnRef);
      if (!nextScreenBtnInstance) return;
      e.preventDefault();
      nextScreenBtnInstance.focus();
    }
  }, []);

  const quickMenuLeftRightCustomHandler = useCallback(
    (e: ReactKeyboardEvent<HTMLAnchorElement>) => {
      quickMenuLeftCustomHandler(e);
      quickMenuRightCustomHandler(e);
    },
    [quickMenuLeftCustomHandler, quickMenuRightCustomHandler]
  );

  const focusInputField = useCallback(() => {
    const inputFieldInstance = getRefCurrentPtr(inputFieldRef);
    if (!inputFieldInstance) return;
    inputFieldInstance.focus();
  }, []);

  const buildTabTrigger = useCallback(
    (tabValue: TabValue, i18nTitle: I18nVocabTarget) => {
      return (
        <TabsTrigger
          onFocusCapture={(e) => {
            if (memorizedTabValue.current) {
              e.preventDefault();
              setTabValue(memorizedTabValue.current);
            }
          }}
          onFocus={(e) => {
            e.preventDefault();
            updateMemorizedTabValueAndSetTabValue(tabValue);
          }}
          className="search-menu-tabslist-item w-full flex-1 font-semibold hover:bg-primary hover:text-white max-lg:h-10 lg:w-fit"
          value={tabValue}
        >
          {capitalize(globalT(i18nTitle))}
        </TabsTrigger>
      );
    },
    [globalT, updateMemorizedTabValueAndSetTabValue]
  );

  const buildDefaultView = useCallback(
    () => (
      <NavigationMenu.Root
        aria-label={globalT(`${i18ns.searchMenuSrOnly}.choose-search-mode`)}
        className="contents [&>div]:contents"
        orientation="vertical"
      >
        <NavigationMenu.List className="contents">
          {banners.map(([category, __Icon], index) => {
            const title = globalT(`${i18ns.searchMenuOptions}.${category}`);
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            const pos = index === 0 ? EBannerPosition.FIRST : index === banners.length - 1 ? EBannerPosition.LAST : EBannerPosition.MIDDLE;

            return (
              <NavigationMenu.Item className="contents" key={category}>
                <NavigationMenu.Link onKeyDown={(e) => quickMenuLeftRightCustomHandler(e)} asChild>
                  <button
                    className={cn(
                      'search-menu-banner flex w-full flex-1 cursor-pointer justify-between bg-accent font-semibold transition-colors hover:bg-primary hover:text-white focus:bg-primary focus:text-white focus:outline-none [&>svg]:hover:border-transparent [&>svg]:focus:border-transparent [&>svg]:dark:hover:border-transparent [&>svg]:dark:focus:border-transparent',
                      { 'rounded-t-md': pos === EBannerPosition.FIRST },
                      { 'rounded-b-md': pos === EBannerPosition.LAST },
                      {
                        'pointer-events-none opacity-50 hover:cursor-default dark:opacity-75 [&>svg]:border-transparent [&>svg]:dark:border-transparent':
                          tabValue === category
                      }
                    )}
                    onClick={() => {
                      updateMemorizedTabValueAndSetTabValue(category);
                      focusInputField();
                    }}
                    aria-label={title}
                  >
                    <__Icon className="flex h-full max-h-full min-h-10 w-auto min-w-10 max-w-[10%] rounded-md border border-black border-transparent dark:border-white" />
                    <span className="search-menu-banner-span my-auto flex-1 text-left max-sm:text-base">{title}</span>
                  </button>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            );
          })}

          <nav aria-label={globalT(`${i18ns.searchMenuSrOnly}.quick-access`)} className="search-menu-footer flex w-full flex-col">
            <div className="search-menu-footer-items flex w-full flex-wrap justify-center">
              {quickAccessBtns.map(([href, __Icon]) => (
                <NavigationMenu.Item className="flex w-full flex-1 items-center justify-center" key={href}>
                  <NavigationMenu.Link
                    className="flex h-fit flex-1 flex-col items-center justify-center rounded-md bg-accent p-4 font-semibold transition-colors hover:bg-primary hover:text-white focus:bg-primary focus:text-white focus:outline-none lg:min-w-[200px]"
                    onClick={() => setIsOpened(false)}
                    href={href}
                  >
                    <__Icon className="h-10 w-10" />
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ))}
            </div>
          </nav>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    ),
    [tabValue, globalT, updateMemorizedTabValueAndSetTabValue, quickMenuLeftRightCustomHandler, focusInputField]
  );

  const prevScreenBtn = (
    <button
      onClick={() => {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const indexOf = ALL_TAB_VALUES.indexOf(tabValue) - 1;
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const newIdx = indexOf < 0 ? ALL_TAB_VALUES.length - 1 : indexOf;
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        updateMemorizedTabValueAndSetTabValue(ALL_TAB_VALUES[newIdx]);
      }}
      className="search-menu-prev-next-btn sticky top-[calc(50%-1rem)] h-fit scale-125 self-center rounded-full bg-accent transition-all hover:scale-150 hover:bg-primary hover:text-white focus:scale-150 focus:bg-primary focus:text-white dark:opacity-75 hover:dark:opacity-100 dark:focus:opacity-100"
      onKeyDown={(e) => {
        if (e.key !== 'ArrowRight') return;
        e.preventDefault();
        focusInputField();
      }}
      aria-label={globalT(`${i18ns.searchMenuSrOnly}.prev-screen`)}
      disabled={!isLargeScreen}
      ref={prevScreenBtnRef}
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
        updateMemorizedTabValueAndSetTabValue(ALL_TAB_VALUES[(indexOf + 1) % ALL_TAB_VALUES.length]);
      }}
      onKeyDown={(e) => {
        if (e.key !== 'ArrowLeft') return;
        e.preventDefault();
        focusInputField();
      }}
      aria-label={globalT(`${i18ns.searchMenuSrOnly}.next-screen`)}
      disabled={!isLargeScreen}
      ref={nextScreenBtnRef}
    >
      <ChevronRightIcon className="search-menu-prev-next-icon max-lg:hidden" />
    </button>
  );

  const defaultView = <>{buildDefaultView()}</>;

  return (
    <Dialog
      onOpenChange={(_isOpened: boolean) => {
        setIsOpened(_isOpened);
        updateMemorizedTabValueAndSetTabValue(TAB_VALUE_INITIAL_STATE);
        setSearchText(SEARCH_TEXT_INITIAL_STATE);
        setDebouncedSearchText(SEARCH_TEXT_INITIAL_STATE);
      }}
      open={isOpened}
    >
      <DialogTrigger aria-label={globalT(`${i18ns.navbar}.sr-only.open-search-menu`)} className="h-full w-4">
        <MagnifyingGlassIcon />
      </DialogTrigger>
      <DialogContent
        className="search-menu-dialog flex h-fit max-h-[90vh] min-h-[90vh] w-full max-w-[90vw] overflow-y-auto overflow-x-hidden"
        onAnimationEnd={() => {
          if (!isOpened) return;
          focusInputField();
        }}
        closeButtonI18nTitle={`${i18ns.searchMenuSrOnly}.close-search-menu`}
        closeButtonClassName="search-menu-close-btn"
        onOpenAutoFocus={(e) => e.preventDefault()}
        dir="ltr"
      >
        {prevScreenBtn}
        <Tabs
          onValueChange={(v) => updateMemorizedTabValueAndSetTabValue(v as TabValue)}
          className="search-menu-gap-y flex w-full flex-col lg:px-5"
          orientation={isLargeScreen ? 'horizontal' : 'vertical'}
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
