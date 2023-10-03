import { useLayoutEffect } from 'react';

const EFFECT_CLASSES = ['h-100svh', 'overflow-y-hidden'];

const useLockScreenScrollY = () =>
  useLayoutEffect(() => {
    document.body.classList.add(...EFFECT_CLASSES);

    return () => document.body.classList.remove(...EFFECT_CLASSES);
  }, []);

export default useLockScreenScrollY;
