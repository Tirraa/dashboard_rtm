import type { HookDepsArrayPrimitives } from '@rtm/shared-types/React';
import type { RefObject } from 'react';

import resetScroll from '@rtm/shared-lib/portable/html/resetScroll';
import { useLayoutEffect } from 'react';

interface ResetScrollOptions {
  additionalDep?: HookDepsArrayPrimitives;
  alsoResetWindowScroll?: boolean;
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
