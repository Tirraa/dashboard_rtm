'use client';

import type { QuickAccessBtnMetadatas, navbarSearchBtnProps, BannersMetadatas } from '@/config/searchMenu';
import type { KeyboardEvent as ReactKeyboardEvent, ChangeEventHandler, ReactElement } from 'react';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { I18nVocabTarget } from '@rtm/shared-types/I18n';
import type { Index } from '@rtm/shared-types/Numbers';
import type { AppPath } from '@rtm/shared-types/Next';

import {
  doUpdateMemorizedTabValueAndSetTabValue,
  createNavbarSearchButtonProps,
  doBuildTabTrigger
} from '@/components/ui/search/helpers/functions/navbarSearchButton';
import { MagnifyingGlassIcon, ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import { DialogContent, DialogTrigger, DialogHeader, Dialog } from '@/components/ui/Dialog';
import { SEARCH_TEXT_INITIAL_STATE, RESULTS_INITIAL_STATE } from '@/config/searchMenu';
import { tryToPreloadPagefind, tryToInitPagefind } from '@/lib/pagefind/helpers/perf';
import { useCallback, useEffect, useState, Fragment, useMemo, useRef } from 'react';
import { TabsContent, TabsList, Tabs } from '@/components/ui/Tabs';
import useIsLargeScreen from '@/components/hooks/useIsLargeScreen';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { SEARCH_MODAL_ID } from '@/config/elementsId';
import { getClientSideI18n } from '@/i18n/client';
import { Input } from '@/components/ui/Input';
import { usePathname } from 'next/navigation';
import { capitalize } from '@/lib/str';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';

import NavbarSearchButtonDialogSearchBoxDefaultView from './NavbarSearchButtonDialogSearchBoxDefaultView';
import ProgressiveResults from './ProgressiveResults';

interface NavbarSearchButtonProps<AllTabValues extends readonly string[]> {
  tabInputLabels: Record<AllTabValues[Index], I18nVocabTarget>;
  quickAccessBtns: Record<AppPath, QuickAccessBtnMetadatas>;
  tabTriggers: Record<AllTabValues[Index], I18nVocabTarget>;
  banners: Record<AllTabValues[Index], BannersMetadatas>;
  tabValueInitialState: AllTabValues[Index];
  allTabValues: AllTabValues;
}

const NavbarSearchButtonInner = <AllTabValues extends typeof navbarSearchBtnProps.allTabValues>({
  quickAccessBtns: orgQuickAccessBtns,
  allTabValues: orgAllTabValues,
  tabTriggers: orgTabTriggers,
  tabValueInitialState,
  banners: orgBanners,
  tabInputLabels
}: NavbarSearchButtonProps<AllTabValues>) => {
  type TabValue = AllTabValues[Index];

  const prevScreenBtnRef = useRef<HTMLButtonElement>(null);
  const nextScreenBtnRef = useRef<HTMLButtonElement>(null);

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
  const [tabValue, setTabValue] = useState(tabValueInitialState);
  const pathnameAtOpen = useRef<MaybeNull<AppPath>>(null);
  const inputFieldRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const isLargeScreen = useIsLargeScreen();
  const memorizedTabValue = useRef(tabValue);
  const [transitionClass, setTransitionClass] = useState<string>('');

  const globalT = getClientSideI18n();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchText(e.target.value);
    try {
      tryToPreloadPagefind(e.target.value);
    } catch {}
  };

  useEffect(() => {
    if (pathnameAtOpen.current === null || pathnameAtOpen.current === currentPathname) return;
    setIsOpened(false);
  }, [currentPathname]);

  const updateMemorizedTabValueAndSetTabValue = useCallback(
    (v: TabValue) => doUpdateMemorizedTabValueAndSetTabValue(v, memorizedTabValue, setTabValue),
    []
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

  const resetDialog = useCallback(() => {
    setSearchText(SEARCH_TEXT_INITIAL_STATE);
    setResults(RESULTS_INITIAL_STATE);
    setTransitionClass('transition-none');
    updateMemorizedTabValueAndSetTabValue(tabValueInitialState);
  }, [tabValueInitialState, updateMemorizedTabValueAndSetTabValue]);

  useEffect(() => {
    if (searchText === SEARCH_TEXT_INITIAL_STATE) setResults(RESULTS_INITIAL_STATE);
  }, [searchText]);

  const prevScreenBtn = (
    <button
      onClick={() => {
        // eslint-disable-next-line no-magic-numbers
        const indexOf = allTabValues.indexOf(tabValue) - 1;
        // eslint-disable-next-line no-magic-numbers
        const newIdx = indexOf < 0 ? allTabValues.length - 1 : indexOf;
        // eslint-disable-next-line no-magic-numbers
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
        // eslint-disable-next-line no-magic-numbers
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

  const defaultSearchBoxView = (
    <NavbarSearchButtonDialogSearchBoxDefaultView
      updateMemorizedTabValueAndSetTabValue={updateMemorizedTabValueAndSetTabValue as (v: string) => void}
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
        if (_isOpened) resetDialog();
        pathnameAtOpen.current = _isOpened ? currentPathname : null;
        setIsOpened(_isOpened);
      }}
      open={isOpened}
    >
      <DialogTrigger
        aria-label={globalT(`${i18ns.navbar}.sr-only.open-search-menu`)}
        onMouseOver={tryToInitPagefind}
        onFocus={tryToInitPagefind}
        className="h-full w-4"
      >
        <MagnifyingGlassIcon />
      </DialogTrigger>
      <DialogContent
        className={cn(
          'search-menu-dialog flex h-fit max-h-[90vh] min-h-[90vh] w-full max-w-[90vw] overflow-y-auto overflow-x-hidden',
          transitionClass
        )}
        onAnimationEnd={() => {
          if (!isOpened) {
            resetDialog();
            return;
          }
          focusInputField();
        }}
        onAnimationStart={() => {
          setTransitionClass('');
        }}
        closeButtonI18nTitle={`${i18ns.searchMenuSrOnly}.close-search-menu`}
        closeButtonClassName="search-menu-close-btn"
        onOpenAutoFocus={(e) => e.preventDefault()}
        data-pagefind-ignore="all"
        dir="ltr"
      >
        {prevScreenBtn}
        <Tabs
          onValueChange={(v) => {
            updateMemorizedTabValueAndSetTabValue(v as TabValue);
          }}
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
                value={isOpened ? searchText : SEARCH_TEXT_INITIAL_STATE}
                className="search-menu-input"
                id={SEARCH_MODAL_ID}
                onChange={onChange}
                ref={inputFieldRef}
                type="text"
              />
            </div>
          </DialogHeader>
          <div
            className={cn('flex-1 rounded-md', {
              'min-h-0 overflow-y-auto break-words border border-input px-8 max-lg:px-4 [&>*>*>*>*>*]:mb-8 first:[&>*>*>*>*>*]:my-8 max-lg:[&>*>*>*>*>*]:mb-4 max-lg:first:[&>*>*>*>*>*]:my-4':
                searchText !== SEARCH_TEXT_INITIAL_STATE && results !== null
            })}
            ref={resultsContainerRef}
            tabIndex={-1}
          >
            {allTabValues.map((v) => (
              <TabsContent
                className={cn('mt-0 flex h-full max-h-full w-full flex-col items-center', {
                  hidden: tabValue !== v
                })}
                tabIndex={-1}
                value={v}
                key={v}
              >
                {searchText === SEARCH_TEXT_INITIAL_STATE ? (
                  defaultSearchBoxView
                ) : (
                  <ProgressiveResults
                    quickMenuLeftRightCustomHandler={quickMenuLeftRightCustomHandler}
                    firstLoadPlaceholder={defaultSearchBoxView}
                    resultsContainerRef={resultsContainerRef}
                    searchDocumentType={tabValue}
                    searchText={searchText}
                    setResults={setResults}
                    results={results}
                  />
                )}
              </TabsContent>
            ))}
          </div>
        </Tabs>
        {nextScreenBtn}
      </DialogContent>
    </Dialog>
  );
};

export default NavbarSearchButtonInner;
