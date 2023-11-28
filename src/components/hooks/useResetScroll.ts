import { resetScroll } from '@rtm/shared-lib/src/html';
import type { HookDepsArrayPrimitives } from '@rtm/shared-types/src/React';
import type { RefObject } from 'react';
import { useLayoutEffect } from 'react';

interface ResetScrollOptions {
  alsoResetWindowScroll?: boolean;
  additionalDep?: HookDepsArrayPrimitives;
}

function useResetScroll<T extends HTMLElement>(
  scrollableElementToResetRef?: RefObject<T>,
  { alsoResetWindowScroll, additionalDep }: ResetScrollOptions = {}
) {
  useLayoutEffect(
    () => resetScroll(scrollableElementToResetRef, Boolean(alsoResetWindowScroll)),

    [scrollableElementToResetRef, alsoResetWindowScroll, additionalDep]
  );
}

export default useResetScroll;
