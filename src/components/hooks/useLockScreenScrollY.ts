import ELEMENTS_ID from '@/config/elementsId';
import { useLayoutEffect } from 'react';

const EFFECT_CLASSES = ['h-100svh', 'overflow-y-hidden'];

const useLockScreenScrollY = () =>
  useLayoutEffect(() => {
    document.getElementById(ELEMENTS_ID.NEXTUI_PROVIDER)?.classList.add(...EFFECT_CLASSES);

    return () => document.getElementById(ELEMENTS_ID.NEXTUI_PROVIDER)?.classList.remove(...EFFECT_CLASSES);
  }, []);

export default useLockScreenScrollY;
