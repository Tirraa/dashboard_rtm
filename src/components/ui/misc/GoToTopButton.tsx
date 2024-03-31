'use client';

import type { PxValue } from '@rtm/shared-types/Numbers';
import type { FunctionComponent } from 'react';

import { APPROX_120_FPS_THROTTLE_TIMING_IN_MS } from '@/config/throttling';
import { useCallback, useEffect, useState, useRef } from 'react';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { ArrowUpIcon } from '@heroicons/react/20/solid';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';
import throttle from 'throttleit';

// {ToDo} Remove this if, one day, this bug is fixed: https://bugs.webkit.org/show_bug.cgi?id=201556
// https://github.com/argyleink/scrollyfills?tab=readme-ov-file#polyfills
// eslint-disable-next-line import/no-extraneous-dependencies
require('scrollyfills').scrollend;

export interface GoToTopButtonProps {
  scrollYthreshold?: PxValue;
}

const SCROLL_Y_THRESHOLD_DEFAULT = 250;

const GoToTopButton: FunctionComponent<GoToTopButtonProps> = ({ scrollYthreshold: scrollYthresholdValue }) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const scopedT = useScopedI18n(i18ns.srOnly);

  const btnRef = useRef<HTMLButtonElement>(null);
  const skipUpdateUntilScrollEnd = useRef<boolean>(false);
  const scrollYthreshold = useRef<PxValue>(scrollYthresholdValue ?? SCROLL_Y_THRESHOLD_DEFAULT);

  const ariaLabel = scopedT('goToTop');

  const onClickFn = useCallback(() => {
    skipUpdateUntilScrollEnd.current = true;
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (skipUpdateUntilScrollEnd.current) return;
      setIsShown(window.scrollY > scrollYthreshold.current);
    };

    const throttledScrollHandler = throttle(handleScroll, APPROX_120_FPS_THROTTLE_TIMING_IN_MS);

    window.addEventListener('scroll', throttledScrollHandler);

    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, []);

  useEffect(() => {
    const handleScrollEnd = () => {
      if (!skipUpdateUntilScrollEnd.current) return;
      skipUpdateUntilScrollEnd.current = false;
      setIsShown(window.scrollY > scrollYthreshold.current);
    };

    window.addEventListener('scrollend', handleScrollEnd);

    return () => {
      window.removeEventListener('scrollend', handleScrollEnd);
    };
  }, []);

  useEffect(() => {
    setIsShown(window.scrollY > scrollYthreshold.current);
  }, []);

  useEffect(() => {
    const btnInstance = getRefCurrentPtr(btnRef);
    if (!btnInstance) return;

    if (isShown) {
      btnInstance.style.transform = '';
      return;
    }

    const btnHeight = btnInstance.getBoundingClientRect().height;
    btnInstance.style.transform = `translateY(${btnHeight}px)`;
  }, [isShown]);

  return (
    <button
      className={cn(
        'fixed bottom-0 right-0 m-2 h-10 w-10 cursor-pointer rounded-md bg-card p-2 text-lg font-bold opacity-0 transition-all duration-200 ease-in-out',
        { 'opacity-65 hover:opacity-100 focus:opacity-100': isShown }
      )}
      onClick={isShown ? onClickFn : undefined}
      aria-hidden={!isShown}
      aria-label={ariaLabel}
      disabled={!isShown}
      ref={btnRef}
    >
      <ArrowUpIcon />
    </button>
  );
};

export default GoToTopButton;
