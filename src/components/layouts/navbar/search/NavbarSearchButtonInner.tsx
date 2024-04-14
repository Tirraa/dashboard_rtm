'use client';

import type { KeyboardEvent as ReactKeyboardEvent, ChangeEventHandler, ReactElement } from 'react';
import type { QuickAccessBtnMetadatas, BannersMetadatas } from '@/config/searchMenu';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { I18nVocabTarget } from '@rtm/shared-types/I18n';
import type { Index } from '@rtm/shared-types/Numbers';
import type { AppPath } from '@rtm/shared-types/Next';

import {
  doUpdateMemorizedTabValueAndSetTabValue,
  createNavbarSearchButtonProps,
  computeAndSetResults,
  doBuildTabTrigger
} from '@/components/ui/search/helpers/functions/navbarSearchButton';
import { MagnifyingGlassIcon, ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import { DialogContent, DialogTrigger, DialogHeader, Dialog } from '@/components/ui/Dialog';
import { useCallback, useEffect, useState, Fragment, useMemo, useRef } from 'react';
import { TabsContent, TabsList, Tabs } from '@/components/ui/Tabs';
import useIsLargeScreen from '@/components/hooks/useIsLargeScreen';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { getClientSideI18n } from '@/i18n/client';
import { Input } from '@/components/ui/Input';
import { usePathname } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { capitalize } from '@/lib/str';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';

import NavbarSearchButtonDialogDefaultView from './NavbarSearchButtonDialogDefaultView';

export interface NavbarSearchButtonProps<AllTabValues extends readonly string[]> {
  tabInputLabels: Record<AllTabValues[Index], I18nVocabTarget>;
  quickAccessBtns: Record<AppPath, QuickAccessBtnMetadatas>;
  tabTriggers: Record<AllTabValues[Index], I18nVocabTarget>;
  banners: Record<AllTabValues[Index], BannersMetadatas>;
  tabValueInitialState: AllTabValues[Index];
  allTabValues: AllTabValues;
}

const SEARCH_TEXT_INITIAL_STATE = '';
const RESULTS_INITIAL_STATE: MaybeNull<ReactElement[]> = null;

const NavbarSearchButton = <AllTabValues extends readonly string[]>({
  quickAccessBtns: orgQuickAccessBtns,
  allTabValues: orgAllTabValues,
  tabTriggers: orgTabTriggers,
  tabValueInitialState,
  banners: orgBanners,
  tabInputLabels
}: NavbarSearchButtonProps<AllTabValues>) => {
  type TabValue = AllTabValues[Index];

  const { quickAccessBtns, allTabValues, tabTriggers, banners } = useMemo(
    () =>
      createNavbarSearchButtonProps({
        quickAccessBtns: orgQuickAccessBtns,
        allTabValues: orgAllTabValues,
        tabTriggers: orgTabTriggers,
        banners: orgBanners
      }),
    [orgQuickAccessBtns, orgAllTabValues, orgTabTriggers, orgBanners]
  );

  const currentPathname = usePathname();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>(SEARCH_TEXT_INITIAL_STATE);
  const [results, setResults] = useState<MaybeNull<ReactElement[]>>(RESULTS_INITIAL_STATE);
  const [tabValue, setTabValue] = useState<TabValue>(tabValueInitialState);
  const pathnameAtOpen = useRef<MaybeNull<AppPath>>(null);
  const inputFieldRef = useRef<HTMLInputElement>(null);
  const prevScreenBtnRef = useRef<HTMLButtonElement>(null);
  const nextScreenBtnRef = useRef<HTMLButtonElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const [debouncedSearchText, setDebouncedSearchText] = useDebounce(searchText, 200);
  const isLargeScreen = useIsLargeScreen();
  const memorizedTabValue = useRef(tabValue);

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

    try {
      computeAndSetResults(debouncedSearchText, setResults);
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

  const prevScreenBtn = (
    <button
      onClick={() => {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const indexOf = allTabValues.indexOf(tabValue) - 1;
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const newIdx = indexOf < 0 ? allTabValues.length - 1 : indexOf;
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        updateMemorizedTabValueAndSetTabValue(allTabValues[newIdx]);
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
        const indexOf = allTabValues.indexOf(tabValue);
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        updateMemorizedTabValueAndSetTabValue(allTabValues[(indexOf + 1) % allTabValues.length]);
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

  const defaultView = (
    <NavbarSearchButtonDialogDefaultView
      updateMemorizedTabValueAndSetTabValue={updateMemorizedTabValueAndSetTabValue}
      quickMenuLeftRightCustomHandler={quickMenuLeftRightCustomHandler}
      focusInputField={focusInputField}
      quickAccessBtns={quickAccessBtns}
      tabValue={tabValue}
      banners={banners}
    />
  );

  return (
    <Dialog
      onOpenChange={(_isOpened: boolean) => {
        pathnameAtOpen.current = _isOpened ? currentPathname : null;
        setIsOpened(_isOpened);
        updateMemorizedTabValueAndSetTabValue(tabValueInitialState);
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
                <Fragment key={`tab-${category as TabValue}`}>{buildTabTrigger(category as TabValue, i18nTitle)}</Fragment>
              ))}
            </TabsList>
            <div className="flex w-full flex-col" style={{ marginTop: '0' }}>
              <label htmlFor="modal-search" className="sr-only">
                {globalT(tabInputLabels[tabValue] as I18nVocabTarget)}
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
            className={cn('flex-1 rounded-md', {
              'min-h-0 overflow-y-auto border border-input px-2 [&>*>*]:pb-2 first:[&>*>*]:py-2': results !== null,
              "after:block after:h-10 after:content-['']": debouncedSearchText === SEARCH_TEXT_INITIAL_STATE
            })}
          >
            {/* {ToDo} Generate these TabsContent programmatically */}
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
