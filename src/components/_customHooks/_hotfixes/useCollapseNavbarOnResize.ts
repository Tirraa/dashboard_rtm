import { getRefCurrentPtr } from '@/lib/react';
import { RefObject, useEffect } from 'react';

const hotfixClassList = ['opacity-0'];
const animationStartLatencyInMs = 250;

export function useCollapseNavbarOnResize(breakpointPxValue: number, mobileMenuInstanceRef: RefObject<HTMLDivElement>, setOpenNav: Function) {
  useEffect(() => {
    let hiddenMobileMenuInstance = false;
    let coroutine: NodeJS.Timeout | null = null;

    function collapseNavbarMenuWhenWindowIsLargeEnough() {
      if (window.innerWidth >= breakpointPxValue) {
        if (!hiddenMobileMenuInstance) {
          const mobileMenuInstance = getRefCurrentPtr(mobileMenuInstanceRef);
          mobileMenuInstance?.classList.add(...hotfixClassList);
          hiddenMobileMenuInstance = true;
          coroutine = setTimeout(() => {
            setOpenNav(false);
            clearTimeout(coroutine as NodeJS.Timeout);
            coroutine = null;
          }, animationStartLatencyInMs);
        }
      } else {
        if (hiddenMobileMenuInstance) {
          const mobileMenuInstance = mobileMenuInstanceRef.current;
          mobileMenuInstance?.classList.remove(...hotfixClassList);
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
  }, [breakpointPxValue, mobileMenuInstanceRef, setOpenNav]); // * ... Empty deps array's driving nut the linter on build. ¯\_(ツ)_/¯
}

export default useCollapseNavbarOnResize;
