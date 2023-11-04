import ELEMENTS_ID from '@/config/elementsId';
import { useLayoutEffect } from 'react';

const EFFECT_CLASSES = ['h-100svh', 'overflow-y-hidden'];

const useLockScreenScrollY = () =>
  useLayoutEffect(() => {
    const getTarget = () => document.getElementById(ELEMENTS_ID.BODY_CONTAINER) as HTMLElement;
    getTarget().classList.add(...EFFECT_CLASSES);

    return () => getTarget().classList.remove(...EFFECT_CLASSES);
  }, []);

export default useLockScreenScrollY;
