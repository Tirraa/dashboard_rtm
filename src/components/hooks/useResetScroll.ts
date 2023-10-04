import { resetScroll } from '@/lib/html';
import { HookDepsArrayPrimitives } from '@/types/React';
import { RefObject, useEffect } from 'react';

interface ResetScrollOptions {
  alsoResetWindowScroll?: boolean;
  additionalDep?: HookDepsArrayPrimitives;
}

function useResetScroll<T extends HTMLElement>(scrollableElementToResetRef?: RefObject<T>, options?: ResetScrollOptions) {
  useEffect(
    () => resetScroll(scrollableElementToResetRef, Boolean(options?.alsoResetWindowScroll)),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options?.additionalDep]
  );
}

export default useResetScroll;
