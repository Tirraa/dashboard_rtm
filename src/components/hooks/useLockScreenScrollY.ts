import { getBodyContainer } from '@/lib/html';
import { useLayoutEffect } from 'react';

export const EFFECT_CLASSES = ['h-100svh', 'overflow-y-hidden'];

const useLockScreenScrollY = () =>
  useLayoutEffect(() => {
    getBodyContainer().classList.add(...EFFECT_CLASSES);

    return () => getBodyContainer().classList.remove(...EFFECT_CLASSES);
  }, []);

export default useLockScreenScrollY;
