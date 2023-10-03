import { resetScroll } from '@/lib/html';
import { RefObject, useEffect } from 'react';

interface ResetScrollOptions {
  alsoResetWindowScroll?: boolean;
  additionalDeps?: unknown[];
}

function useResetScroll<T extends HTMLElement>(scrollableElementToResetRef?: RefObject<T>, options?: ResetScrollOptions) {
  useEffect(
    () => resetScroll(scrollableElementToResetRef, Boolean(options?.alsoResetWindowScroll)),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scrollableElementToResetRef?.current, options?.additionalDeps && [...options.additionalDeps]]
  );
}

export default useResetScroll;
