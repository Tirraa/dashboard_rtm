import { resetScroll } from '@/lib/html';
import { useLayoutEffect } from 'react';

const EFFECT_CLASSES = ['w-screen', 'h-screen', 'overflow-hidden'];

const useLockScreenScroll = () =>
  useLayoutEffect(() => {
    document.body.classList.add(...EFFECT_CLASSES);
    resetScroll();

    return () => document.body.classList.remove(...EFFECT_CLASSES);
  }, []);

export default useLockScreenScroll;
