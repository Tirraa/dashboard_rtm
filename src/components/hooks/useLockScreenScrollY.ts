import { useLayoutEffect } from 'react';

const EFFECT_CLASSES = ['h-100svh', 'overflow-y-hidden'];

const useLockScreenScrollY = () =>
  useLayoutEffect(() => {
    document.documentElement.classList.add(...EFFECT_CLASSES);

    return () => document.documentElement.classList.remove(...EFFECT_CLASSES);
  }, []);

export default useLockScreenScrollY;
