/* v8 ignore start */
// Stryker disable all

import type LanguageFlag from '@rtm/shared-types/LanguageFlag';

import { BROKEN_PAGEFIND_STUB, DEV_PAGEFIND_STUB } from '@/config/pagefind';
import PagefindIntegrationError from '@/errors/PagefindIntegrationError';
import { initPagefind } from '@/lib/pagefind/helpers/perf';
import traceError from '@/lib/notPortable/next/traceError';
import { useEffect } from 'react';

// https://github.com/CloudCannon/pagefind/issues/596
function usePagefind(currentLocale: LanguageFlag) {
  useEffect(() => {
    async function bootOrRebootPagefind() {
      async function bootPagefind() {
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
          window.pagefind = DEV_PAGEFIND_STUB;
          return;
        }
        // @ts-ignore generated after build
        const pagefindInstance = await import(/* webpackIgnore: true */ '/pagefind/pagefind.js');
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
      } catch (e) {
        const tracedError = new PagefindIntegrationError(
          (e instanceof Error && e.message) || 'Invalid throw usage, intercepted in a traceError catch.'
        );

        tracedError.cause = (e instanceof Error && e.cause) || undefined;
        tracedError.stack = (e instanceof Error && e.stack) || undefined;
        traceError(tracedError, { userAgent: navigator.userAgent });
        window.pagefind = BROKEN_PAGEFIND_STUB;
      }
    }
    bootOrRebootPagefind();
  }, [currentLocale]);
}

export default usePagefind;

// Stryker restore all
/* v8 ignore stop */
