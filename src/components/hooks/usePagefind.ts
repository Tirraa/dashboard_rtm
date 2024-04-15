/* v8 ignore start */
// Stryker disable all

import type { LanguageFlag } from '@rtm/shared-types/I18n';

import { useEffect } from 'react';

// https://github.com/CloudCannon/pagefind/issues/596
function usePagefind(currentLocale: LanguageFlag) {
  useEffect(() => {
    async function loadPagefind() {
      try {
        // @ts-ignore generated after build
        const freshPagefind = await import(/* webpackIgnore: true */ '../pagefind/pagefind.js');
        window.pagefind = undefined;
        window.pagefind = freshPagefind;
      } catch (error) {
        console.warn('Pagefind failed to load, search will not work');
        window.pagefind = { debouncedSearch: () => ({ results: [] }), search: () => ({ results: [] }) };
      }
    }
    loadPagefind();
  }, [currentLocale]);
}

export default usePagefind;

// Stryker restore all
/* v8 ignore stop */
