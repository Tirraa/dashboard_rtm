'use client';

import type { KeyboardEvent as ReactKeyboardEvent, ChangeEventHandler, FunctionComponent, ReactElement } from 'react';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { I18nVocabTarget } from '@rtm/shared-types/I18n';
import type { AppPath } from '@rtm/shared-types/Next';

import { doUpdateMemorizedTabValueAndSetTabValue, doBuildTabTrigger } from '@/components/ui/search/helpers/functions/navbarSearchButton';
import { MagnifyingGlassIcon, ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import { DialogContent, DialogTrigger, DialogHeader, Dialog } from '@/components/ui/Dialog';
import { useCallback, useEffect, useState, Fragment, useRef } from 'react';
import { TabsContent, TabsList, Tabs } from '@/components/ui/Tabs';
import useIsLargeScreen from '@/components/hooks/useIsLargeScreen';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { hrefAndPathnameExactMatch, capitalize } from '@/lib/str';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import Result from '@/components/ui/search/Result';
import { getClientSideI18n } from '@/i18n/client';
import { Input } from '@/components/ui/Input';
import { usePathname } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

import type { TabValue } from '../../ui/search/helpers/consts';

import { quickAccessBtns, ALL_TAB_VALUES, tabTriggers, banners } from '../../ui/search/helpers/consts';

interface NavbarSearchButtonProps {}

const TAB_VALUE_INITIAL_STATE: TabValue = 'all';
const SEARCH_TEXT_INITIAL_STATE = '';
const RESULTS_INITIAL_STATE: MaybeNull<ReactElement[]> = null;

const NavbarSearchButton: FunctionComponent<NavbarSearchButtonProps> = () => {
  const currentPathname = usePathname();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>(SEARCH_TEXT_INITIAL_STATE);
  const [results, setResults] = useState<MaybeNull<ReactElement[]>>(RESULTS_INITIAL_STATE);
  const [tabValue, setTabValue] = useState<TabValue>(TAB_VALUE_INITIAL_STATE);
  const pathnameAtOpen = useRef<MaybeNull<AppPath>>(null);
  const inputFieldRef = useRef<HTMLInputElement>(null);
  const prevScreenBtnRef = useRef<HTMLButtonElement>(null);
  const nextScreenBtnRef = useRef<HTMLButtonElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const [debouncedSearchText, setDebouncedSearchText] = useDebounce(searchText, 200);
  const isLargeScreen = useIsLargeScreen();
  const memorizedTabValue = useRef<TabValue>(tabValue);

  const globalT = getClientSideI18n();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => setSearchText(e.target.value);

  useEffect(() => {
    if (pathnameAtOpen.current === null || pathnameAtOpen.current === currentPathname) return;
    setIsOpened(false);
  }, [currentPathname]);

  useEffect(() => {
    if (debouncedSearchText === SEARCH_TEXT_INITIAL_STATE) {
      setResults(RESULTS_INITIAL_STATE);
      return;
    }

    async function tryToComputeAndSetResults() {
      try {
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

          results.push(
            <Result key={(result as any).id} metaTitle={metaTitle} excerpt={excerpt} href={cleanedUrl} className="mt-2" result={result} />
          );
        }

        setResults(results);
      } catch (e) {
        throw e;
      }
    }

    try {
      tryToComputeAndSetResults();
    } catch {
      setResults([]);
    }
  }, [debouncedSearchText]);

  const updateMemorizedTabValueAndSetTabValue = useCallback(
    (v: TabValue) => doUpdateMemorizedTabValueAndSetTabValue(v, memorizedTabValue, setTabValue),
    []
  );

  const quickMenuLeftCustomHandler = useCallback((e: ReactKeyboardEvent<HTMLAnchorElement>) => {
    if (e.key !== 'ArrowLeft') return;

    const prevScreenBtnInstance = getRefCurrentPtr(prevScreenBtnRef);
    if (!prevScreenBtnInstance) return;
    e.preventDefault();
    prevScreenBtnInstance.focus();
  }, []);

  const quickMenuRightCustomHandler = useCallback((e: ReactKeyboardEvent<HTMLAnchorElement>) => {
    if (e.key !== 'ArrowRight') return;

    const nextScreenBtnInstance = getRefCurrentPtr(nextScreenBtnRef);
    if (!nextScreenBtnInstance) return;
    e.preventDefault();
    nextScreenBtnInstance.focus();
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
    (tabValue: TabValue, i18nTitle: I18nVocabTarget) => doBuildTabTrigger(tabValue, globalT(i18nTitle), memorizedTabValue, setTabValue),
    [globalT]
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
              {quickAccessBtns.map(([href, { icon: __Icon, i18nTitle }]) => {
                const exactMatch = hrefAndPathnameExactMatch(href, currentPathname);

                return (
                  <NavigationMenu.Item className="flex w-full flex-1 items-center justify-center" key={href}>
                    <NavigationMenu.Link asChild>
                      <Link
                        className={cn(
                          'flex h-fit flex-1 flex-col items-center justify-center rounded-md bg-accent p-4 font-semibold transition-colors hover:bg-primary hover:text-white focus:bg-primary focus:text-white focus:outline-none lg:min-w-[200px]',
                          {
                            'pointer-events-none opacity-50': exactMatch
                          }
                        )}
                        aria-current={exactMatch ? 'page' : undefined}
                        href={href}
                      >
                        <__Icon className="h-10 w-10" />
                        <span className="sr-only">{globalT(i18nTitle)}</span>
                      </Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                );
              })}
            </div>
          </nav>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    ),
    [tabValue, globalT, updateMemorizedTabValueAndSetTabValue, quickMenuLeftRightCustomHandler, focusInputField, currentPathname]
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
        pathnameAtOpen.current = _isOpened ? currentPathname : null;
        setIsOpened(_isOpened);
        updateMemorizedTabValueAndSetTabValue(TAB_VALUE_INITIAL_STATE);
        setSearchText(SEARCH_TEXT_INITIAL_STATE);
        setDebouncedSearchText(SEARCH_TEXT_INITIAL_STATE);
        setResults(RESULTS_INITIAL_STATE);
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
              <label htmlFor="modal-search" className="sr-only">
                {globalT(`${i18ns.searchMenuOptions}.${tabValue}`)}
              </label>
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
              {results === null || debouncedSearchText === SEARCH_TEXT_INITIAL_STATE ? defaultView : results}
            </TabsContent>
            <TabsContent
              className={cn('mt-0 flex h-full max-h-full w-full flex-col items-center', {
                hidden: tabValue !== 'pages'
              })}
              value={'pages' satisfies TabValue}
              tabIndex={-1}
            >
              {results === null || debouncedSearchText === SEARCH_TEXT_INITIAL_STATE ? defaultView : results}
            </TabsContent>
            <TabsContent
              className={cn('mt-0 flex h-full max-h-full w-full flex-col items-center', {
                hidden: tabValue !== 'blog'
              })}
              value={'blog' satisfies TabValue}
              tabIndex={-1}
            >
              {results === null || debouncedSearchText === SEARCH_TEXT_INITIAL_STATE ? defaultView : results}
            </TabsContent>
          </div>
        </Tabs>
        {nextScreenBtn}
      </DialogContent>
    </Dialog>
  );
};

export default NavbarSearchButton;

enum EBannerPosition {
  FIRST,
  MIDDLE,
  LAST
}
