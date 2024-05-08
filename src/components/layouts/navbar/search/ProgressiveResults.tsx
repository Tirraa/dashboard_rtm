'use client';

import type { KeyboardEvent as ReactKeyboardEvent, FunctionComponent, ReactElement, RefObject } from 'react';
import type { SearchDocumentFlag } from '@/lib/pagefind/helpers/search';
import type { MsValue, Count, Limit } from '@rtm/shared-types/Numbers';
import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';

import { buildResultOnFocus } from '@/components/ui/search/helpers/functions/navbarSearchButton';
import { SEARCH_TEXT_INITIAL_STATE, THROTTLE_DELAY } from '@/config/searchMenu';
import { searchDocument, getCleanedURL } from '@/lib/pagefind/helpers/search';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { useToast } from '@/components/hooks/useToast';
import Result from '@/components/ui/search/Result';
import { getClientSideI18n } from '@/i18n/client';
import { useCallback, useEffect } from 'react';
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

  const computeAndSetResults = useCallback(async () => {
    const search = await searchDocument(searchText, searchDocumentType);
    const searchResults = search.results;
    const results: ReactElement[] = [];

    // {ToDo} Optimize this lmao
    // eslint-disable-next-line promise/catch-or-return
    const mountedData = await Promise.all(searchResults.map((r) => r.data()));

    for (let i = 0; i < searchResults.length; i++) {
      const data = mountedData[i];
      if (!data) continue;

      const { url } = data;
      if (!url) continue;

      const cleanedUrl = getCleanedURL(url);
      const metaTitle = data.meta.title;
      const excerpt = data.excerpt;

      // eslint-disable-next-line no-magic-numbers
      const onFocus = buildResultOnFocus(i, searchResults.length - 1, resultsContainerRef);

      results.push(
        <Result
          navigationMenuItemProps={{ onKeyDown: quickMenuLeftRightCustomHandler, className: 'w-full', key: String(i) }}
          key={searchResults[i].id}
          metaTitle={metaTitle}
          onFocus={onFocus}
          excerpt={excerpt}
          href={cleanedUrl}
        />
      );
    }

    setResults(results);
  }, [setResults, searchText, searchDocumentType, resultsContainerRef, quickMenuLeftRightCustomHandler]);

  const throttledComputeAndSetResults = throttle(computeAndSetResults, THROTTLE_DELAY);

  useEffect(() => {
    if (searchText === SEARCH_TEXT_INITIAL_STATE) return;

    let retries: Count = 0;
    const maxRetries: Limit = 4;
    const intervalMs: MsValue = 250;
    let isComputing = false;

    const retryInterval = setInterval(async () => {
      function disposeRetryInterval() {
        // eslint-disable-next-line no-magic-numbers
        retries = 0;
        isComputing = false;
        clearInterval(retryInterval);
      }

      try {
        if (isComputing) return;
        isComputing = true;
        await throttledComputeAndSetResults();
        disposeRetryInterval();
      } catch {
        retries++;
        if (maxRetries >= retries) {
          // {ToDo} This should be logged
          toast({
            description: globalT(`${i18ns.brokenPagefindIntegrationError}.message`),
            title: globalT(`${i18ns.brokenPagefindIntegrationError}.title`),
            variant: 'destructive'
          });
          setResults([]);
          disposeRetryInterval();
        }
      }
    }, intervalMs);

    return () => {
      clearInterval(retryInterval);
    };
  }, [searchText, searchDocumentType, throttledComputeAndSetResults, toast, globalT, setResults]);

  if (results === null) return firstLoadPlaceholder;

  return (
    // eslint-disable-next-line no-magic-numbers
    (results.length > 0 && (
      <>
        <NavigationMenu.Root aria-label={globalT(`${i18ns.searchMenu}.sr-only.results`)} className="contents [&>div]:contents" orientation="vertical">
          <NavigationMenu.List className="contents">{results}</NavigationMenu.List>
        </NavigationMenu.Root>
        <div className="relative bottom-[1px] min-h-[1px] w-full" />
      </>
    )) || <NoResultFound />
  );
};

export default ProgressiveResults;
