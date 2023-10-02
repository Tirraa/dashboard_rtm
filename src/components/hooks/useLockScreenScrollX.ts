import { useLayoutEffect } from 'react';

const EFFECT_CLASSES = ['w-screen', 'overflow-x-hidden'];

const useLockScreenScrollX = () =>
  useLayoutEffect(() => {
    document.body.classList.add(...EFFECT_CLASSES);
    return () => document.body.classList.remove(...EFFECT_CLASSES);
  }, []);

export default useLockScreenScrollX;
