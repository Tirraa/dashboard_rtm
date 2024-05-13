'use client';

import type { KeyboardEvent as ReactKeyboardEvent, FunctionComponent, ReactElement, RefObject } from 'react';
import type { SearchDocumentFlag } from '@/lib/pagefind/helpers/search';
import type { MsValue, Count, Limit } from '@rtm/shared-types/Numbers';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';

import { SEARCH_TEXT_INITIAL_STATE, RESULTS_SLICE_LEN, THROTTLE_DELAY } from '@/config/searchMenu';
import { buildResultOnFocus } from '@/components/ui/search/helpers/functions/navbarSearchButton';
import { searchDocument, getCleanedURL } from '@/lib/pagefind/helpers/search';
import { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import PagefindIntegrationError from '@/errors/PagefindIntegrationError';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { useToast } from '@/components/hooks/useToast';
import Result from '@/components/ui/search/Result';
import { getClientSideI18n } from '@/i18n/client';
import { traceError } from '@/lib/next';
import { i18ns } from '##/config/i18n';
import throttle from 'throttleit';

import NoResultFound from './NoResultFound';

interface ProgressiveResultsProps {
  quickMenuLeftRightCustomHandler: (e: ReactKeyboardEvent<HTMLAnchorElement>) => void;
  setResults: (results: MaybeNull<ReactElement[]>) => void;
  resultsContainerRef: RefObject<HTMLDivElement>;
  searchDocumentType: SearchDocumentFlag;
  results: MaybeNull<ReactElement[]>;
  firstLoadPlaceholder: ReactElement;
  searchText: string;
}

const ProgressiveResults: FunctionComponent<ProgressiveResultsProps> = ({
  quickMenuLeftRightCustomHandler,
  firstLoadPlaceholder,
  resultsContainerRef,
  searchDocumentType,
  setResults,
  searchText,
  results
}) => {
  const globalT = getClientSideI18n();
  const { toast } = useToast();
  // eslint-disable-next-line no-magic-numbers
  const [currentSearchResultsSliceStartIndex, setCurrentSearchResultsSliceStartIndex] = useState<number>(0);
  const [currentSearchResults, setCurrentSearchResults] = useState<ReactElement[]>([]);
  const [displayShowMoreBtn, setDisplayShowMoreBtn] = useState<boolean>(false);

  const currentSearchResultsRef = useRef<ReactElement[]>(currentSearchResults);
  const currentSearchResultsSliceStartIndexRef = useRef<number>(currentSearchResultsSliceStartIndex);
  const resultsRef = useRef<MaybeNull<ReactElement[]>>(results);
  const lastResultRef = useRef<HTMLAnchorElement>(null);

  const resetResultsBoxScroll = useCallback(() => {
    const maybeContainer = getRefCurrentPtr(resultsContainerRef);
    if (maybeContainer === null) return;
    // eslint-disable-next-line no-magic-numbers
    maybeContainer.scrollTo(0, 0);
  }, [resultsContainerRef]);

  useEffect(() => {
    // eslint-disable-next-line no-magic-numbers
    setCurrentSearchResultsSliceStartIndex(0);
    setCurrentSearchResults([]);
    resetResultsBoxScroll();
  }, [searchText, resetResultsBoxScroll]);

  useEffect(() => {
    currentSearchResultsRef.current = currentSearchResults;
  }, [currentSearchResults]);

  useEffect(() => {
    resultsRef.current = results;
  }, [results]);

  useEffect(() => {
    currentSearchResultsSliceStartIndexRef.current = currentSearchResultsSliceStartIndex;
  }, [currentSearchResultsSliceStartIndex]);

  const computeAndSetResults = useCallback(async () => {
    const search = await searchDocument(searchText, searchDocumentType);
    const searchResultsSlice = search.results.slice(
      currentSearchResultsSliceStartIndexRef.current,
      currentSearchResultsSliceStartIndexRef.current + RESULTS_SLICE_LEN
    );
    const freshResults: ReactElement[] = [];

    // eslint-disable-next-line promise/catch-or-return
    const mountedData = await Promise.all(searchResultsSlice.map((r) => r.data()));

    for (let i = 0; i < searchResultsSlice.length; i++) {
      const data = mountedData[i];
      if (!data) continue;

      const { url } = data;
      if (!url) continue;

      const cleanedUrl = getCleanedURL(url);
      const metaTitle = data.meta.title;
      const excerpt = data.excerpt;

      // eslint-disable-next-line no-magic-numbers
      const onFocus = buildResultOnFocus(currentSearchResultsSliceStartIndexRef.current + i, search.results.length - 1, resultsContainerRef);

      freshResults.push(
        <Result
          navigationMenuItemProps={{ onKeyDown: quickMenuLeftRightCustomHandler, className: 'w-full', key: String(i) }}
          // eslint-disable-next-line no-magic-numbers
          ref={searchResultsSlice.length <= i + 1 ? lastResultRef : undefined}
          key={searchResultsSlice[i].id}
          metaTitle={metaTitle}
          onFocus={onFocus}
          excerpt={excerpt}
          href={cleanedUrl}
        />
      );
    }

    const newResults = [...currentSearchResultsRef.current, ...freshResults];
    const newCurrentSearchResultsSliceStartIndex = currentSearchResultsSliceStartIndexRef.current + RESULTS_SLICE_LEN;
    setCurrentSearchResults(newResults);
    setResults(newResults);
    setCurrentSearchResultsSliceStartIndex(newCurrentSearchResultsSliceStartIndex);
    // eslint-disable-next-line no-magic-numbers
    setDisplayShowMoreBtn(newCurrentSearchResultsSliceStartIndex < search.results.length - 1);
  }, [setResults, searchText, searchDocumentType, resultsContainerRef, quickMenuLeftRightCustomHandler]);

  const throttledComputeAndSetResults = useMemo(() => throttle(computeAndSetResults, THROTTLE_DELAY), [computeAndSetResults]);

  useEffect(() => {
    if (searchText === SEARCH_TEXT_INITIAL_STATE) return;

    if (window.pagefind.isBroken) {
      const e = new PagefindIntegrationError('Pagefind failed to load');
      const tracedError = new PagefindIntegrationError(
        (e instanceof Error && e.message) || 'Invalid throw usage, intercepted in a traceError catch.'
      );

      tracedError.cause = (e instanceof Error && e.cause) || undefined;
      tracedError.stack = (e instanceof Error && e.stack) || undefined;
      traceError(tracedError, { userAgent: navigator.userAgent });

      toast({
        description: globalT(`${i18ns.brokenPagefindIntegrationError}.message`),
        title: globalT(`${i18ns.brokenPagefindIntegrationError}.title`),
        variant: 'destructive'
      });

      setResults([]);
      return;
    }

    let retries: Count = 0;
    const maxRetries: Limit = 4;
    const intervalMs: MsValue = 250;
    let isComputing = false;

    let retryInterval: MaybeNull<NodeJS.Timeout> = setInterval(async () => {
      function disposeRetryInterval() {
        // eslint-disable-next-line no-magic-numbers
        retries = 0;
        isComputing = false;
        if (retryInterval) {
          clearInterval(retryInterval);
          retryInterval = null;
        }
      }

      try {
        if (isComputing) return;

        isComputing = true;
        await throttledComputeAndSetResults();
        disposeRetryInterval();
      } catch (e) {
        retries++;

        if (retries >= maxRetries) {
          const tracedError = new PagefindIntegrationError(
            (e instanceof Error && e.message) || 'Invalid throw usage, intercepted in a traceError catch.'
          );

          tracedError.cause = (e instanceof Error && e.cause) || undefined;
          tracedError.stack = (e instanceof Error && e.stack) || undefined;
          traceError(tracedError, { userAgent: navigator.userAgent });

          toast({
            description: globalT(`${i18ns.brokenPagefindIntegrationError}.message`),
            title: globalT(`${i18ns.brokenPagefindIntegrationError}.title`),
            variant: 'destructive'
          });

          setResults([]);
          disposeRetryInterval();
        }

        isComputing = false;
      }
    }, intervalMs);

    return () => {
      if (retryInterval) {
        clearInterval(retryInterval);
        retryInterval = null;
      }
    };
  }, [searchText, searchDocumentType, throttledComputeAndSetResults, toast, globalT, setResults]);

  if (results === null) return firstLoadPlaceholder;

  return (
    // eslint-disable-next-line no-magic-numbers
    (results.length > 0 && (
      <>
        <NavigationMenu.Root aria-label={globalT(`${i18ns.searchMenu}.sr-only.results`)} className="contents [&>div]:contents" orientation="vertical">
          <NavigationMenu.List className="contents">
            {results}
            {displayShowMoreBtn && (
              <NavigationMenu.Item key={'show-more-btn'}>
                <NavigationMenu.Link asChild>
                  <button
                    onClick={async () => {
                      const oldLastResultInstance = getRefCurrentPtr(lastResultRef);
                      setDisplayShowMoreBtn(false);
                      await computeAndSetResults();
                      if (oldLastResultInstance) oldLastResultInstance.focus();
                    }}
                    className="search-menu-see-more-btn bg-primary font-semibold text-white"
                  >
                    {globalT(`${i18ns.vocab}.see-more`)}
                  </button>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            )}
          </NavigationMenu.List>
        </NavigationMenu.Root>
        <div className="relative bottom-[1px] min-h-[1px] w-full" />
      </>
    )) || <NoResultFound />
  );
};

export default ProgressiveResults;
