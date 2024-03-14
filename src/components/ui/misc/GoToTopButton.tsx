'use client';

import type { FunctionComponent } from 'react';

import { useCallback, useEffect, useState, useRef } from 'react';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { ArrowUpIcon } from '@heroicons/react/20/solid';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';

// https://github.com/argyleink/scrollyfills?tab=readme-ov-file#polyfills
// eslint-disable-next-line import/no-extraneous-dependencies
require('scrollyfills').scrollend;

export interface GoToTopButtonProps {
  scrollYthreshold?: number;
}

const SCROLL_Y_THRESHOLD_DEFAULT = 400;

const GoToTopButton: FunctionComponent<GoToTopButtonProps> = ({ scrollYthreshold: scrollYthresholdValue }) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const scopedT = useScopedI18n(i18ns.srOnly);

  const btnRef = useRef<HTMLButtonElement>(null);
  const skipUpdateUntilScrollEnd = useRef<boolean>(false);
  const scrollYthreshold = useRef<number>(scrollYthresholdValue ?? SCROLL_Y_THRESHOLD_DEFAULT);

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

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
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
