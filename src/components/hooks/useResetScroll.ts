import { resetScroll } from '@/lib/html';
import { HookDepsArrayPrimitives } from '@/types/React';
import { RefObject, useLayoutEffect } from 'react';

interface ResetScrollOptions {
  alsoResetWindowScroll?: boolean;
  additionalDep?: HookDepsArrayPrimitives;
}

function useResetScroll<T extends HTMLElement>(scrollableElementToResetRef?: RefObject<T>, {alsoResetWindowScroll, additionalDep}: ResetScrollOptions = {}) {
  useLayoutEffect(
    () => resetScroll(scrollableElementToResetRef, Boolean(alsoResetWindowScroll)),

    [scrollableElementToResetRef, alsoResetWindowScroll, additionalDep]
  );
}

export default useResetScroll;
