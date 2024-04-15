/* v8 ignore start */
// Stryker disable all

import type { LanguageFlag } from '@rtm/shared-types/I18n';

import { useEffect } from 'react';

export async function initPagefind() {
  if (typeof window.pagefind === 'undefined') return;
  await window.pagefind.init();
}

// {ToDo} https://github.com/CloudCannon/pagefind/issues/596
function usePagefind(currentLocale: LanguageFlag) {
  useEffect(() => {
    async function bootOrRebootPagefind() {
      async function bootPagefind() {
        // @ts-ignore generated after build
        const pagefindInstance = await import(/* webpackIgnore: true */ '../pagefind/pagefind.js');
        window.pagefind = pagefindInstance;
      }

      async function rebootPagefind() {
        await window.pagefind.destroy();
        await initPagefind();
      }

      try {
        if (typeof window.pagefind !== 'undefined') {
          try {
            await rebootPagefind();
            return;
          } catch {
            await bootPagefind();
          }
        }
        await bootPagefind();
      } catch (error) {
        console.warn('Pagefind failed to load, search will not work');
        window.pagefind = { debouncedSearch: () => ({ results: [] }), search: () => ({ results: [] }), destroy: () => {}, init: () => {} };
      }
    }
    bootOrRebootPagefind();
  }, [currentLocale]);
}

export default usePagefind;

// Stryker restore all
/* v8 ignore stop */
