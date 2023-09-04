import { getRefCurrentPtr } from '@/lib/react';
import { RefObject, useEffect } from 'react';

const HOTFIX_CLASSLIST = ['opacity-0'];
const ANIMATION_START_LATENCY_MS_VALUE = 250;

export function useCollapseNavbarOnResize(breakpointPxValue: number, mobileMenuInstanceRef: RefObject<HTMLDivElement>, setOpenNav: Function) {
  useEffect(
    () => {
      let hiddenMobileMenuInstance = false;
      let coroutine: NodeJS.Timeout | null = null;

      function collapseNavbarMenuWhenWindowIsLargeEnough() {
        if (window.innerWidth >= breakpointPxValue) {
          if (!hiddenMobileMenuInstance) {
            const mobileMenuInstance = getRefCurrentPtr(mobileMenuInstanceRef);
            mobileMenuInstance?.classList.add(...HOTFIX_CLASSLIST);
            hiddenMobileMenuInstance = true;
            coroutine = setTimeout(() => {
              setOpenNav(false);
              clearTimeout(coroutine as NodeJS.Timeout);
              coroutine = null;
            }, ANIMATION_START_LATENCY_MS_VALUE);
          }
        } else {
          if (hiddenMobileMenuInstance) {
            const mobileMenuInstance = mobileMenuInstanceRef.current;
            mobileMenuInstance?.classList.remove(...HOTFIX_CLASSLIST);
            hiddenMobileMenuInstance = false;
          }
          if (coroutine) {
            clearTimeout(coroutine);
            coroutine = null;
          }
        }
      }

      window.addEventListener('resize', collapseNavbarMenuWhenWindowIsLargeEnough);
      return () => {
        window.removeEventListener('resize', collapseNavbarMenuWhenWindowIsLargeEnough);
        if (coroutine) clearTimeout(coroutine);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}

export default useCollapseNavbarOnResize;
