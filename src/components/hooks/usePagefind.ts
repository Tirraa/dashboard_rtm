/* v8 ignore start */
// Stryker disable all

import type { LanguageFlag } from '@rtm/shared-types/I18n';
import type { Quantity } from '@rtm/shared-types/Numbers';

import PAGEFIND_CONFIG from '@/config/pagefind';
import { useEffect } from 'react';

async function initPagefind() {
  if (typeof window.pagefind === 'undefined') return;
  await window.pagefind.init();
}

async function preloadPagefind(req: string, minReqLengthToTriggerPreload: Quantity) {
  if (typeof window.pagefind === 'undefined') return;
  if (req.length < minReqLengthToTriggerPreload) return;
  await window.pagefind.preload(req);
}

export function tryToInitPagefind() {
  try {
    initPagefind();
  } catch {}
}

export function tryToPreloadPagefind(
  req: string,
  minReqLengthToTriggerPreload: Quantity = PAGEFIND_CONFIG.DEFAULT_MIN_REQ_LENGTH_TO_TRIGGER_PRELOAD
) {
  try {
    preloadPagefind(req, minReqLengthToTriggerPreload);
  } catch {}
}

// https://github.com/CloudCannon/pagefind/issues/596
function usePagefind(currentLocale: LanguageFlag) {
  useEffect(() => {
    async function bootOrRebootPagefind() {
      async function bootPagefind() {
        // @ts-ignore generated after build
        const pagefindInstance = await import(/* webpackIgnore: true */ '/pagefind/pagefind.js');
        window.pagefind = pagefindInstance;
        const filters = await window.pagefind.filters(); // {ToDo} Inspect this
        console.log(filters); // {ToDo} Inspect this
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
