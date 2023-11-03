import { useLayoutEffect } from 'react';

const EFFECT_CLASSES = ['h-100svh', 'overflow-y-hidden'];

const useLockScreenScrollY = () =>
  useLayoutEffect(() => {
    const getTarget = () => document.body;
    getTarget().classList.add(...EFFECT_CLASSES);

    return () => getTarget().classList.remove(...EFFECT_CLASSES);
  }, []);

export default useLockScreenScrollY;
