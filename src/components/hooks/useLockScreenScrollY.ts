import ELEMENTS_ID from '@/config/elementsId';
import { useLayoutEffect } from 'react';

const EFFECT_CLASSES = ['h-100svh', 'overflow-y-hidden'];

const useLockScreenScrollY = () =>
  useLayoutEffect(() => {
    const nextuiProviderId = ELEMENTS_ID.NEXTUI_PROVIDER;
    document.body.classList.add(...EFFECT_CLASSES);
    document.getElementById(nextuiProviderId)?.classList.add(...EFFECT_CLASSES);

    return () => {
      document.body.classList.remove(...EFFECT_CLASSES);
      document.getElementById(nextuiProviderId)?.classList.remove(...EFFECT_CLASSES);
    };
  }, []);

export default useLockScreenScrollY;
