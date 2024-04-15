/* v8 ignore start */
// Stryker disable all

import type { Path } from '@rtm/shared-types/Next';

import { useEffect } from 'react';

// https://github.com/CloudCannon/pagefind/issues/596
function usePagefind(pagefindGeneratedFileRelativePath: Path) {
  useEffect(() => {
    async function loadPagefind() {
      if (typeof window.pagefind === 'undefined') {
        try {
          window.pagefind = await import(/* webpackIgnore: true */ pagefindGeneratedFileRelativePath);
        } catch (error) {
          console.warn('Pagefind failed to load, search will not work');
          window.pagefind = { debouncedSearch: () => ({ results: [] }), search: () => ({ results: [] }) };
        }
      }
    }
    loadPagefind();
  }, [pagefindGeneratedFileRelativePath]);
}

export default usePagefind;

// Stryker restore all
/* v8 ignore stop */
