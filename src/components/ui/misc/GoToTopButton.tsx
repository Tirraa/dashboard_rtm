'use client';

import type { FunctionComponent } from 'react';

import { computeHTMLElementHeight } from 'packages/shared-lib/src/html';
import { getRefCurrentPtr } from 'packages/shared-lib/src/react';
import { ArrowUpIcon } from '@heroicons/react/20/solid';
import { useEffect, useState, useRef } from 'react';
import { useScopedI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';

export interface GoToTopButtonProps {
  scrollYthreshold?: number;
}

const SCROLL_Y_THRESHOLD_DEFAULT = 400;

const GoToTopButton: FunctionComponent<GoToTopButtonProps> = ({ scrollYthreshold: scrollYthresholdValue }) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const scopedT = useScopedI18n(i18ns.srOnly);

  const ariaLabel = scopedT('goToTop');
  const scrollYthreshold = scrollYthresholdValue ?? SCROLL_Y_THRESHOLD_DEFAULT;

  useEffect(() => {
    const handleScroll = () => {
      setIsShown(window.scrollY > scrollYthreshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollYthreshold]);

  useEffect(() => {
    setIsShown(window.scrollY > scrollYthreshold);
  }, [scrollYthreshold]);

  useEffect(() => {
    const btnInstance = getRefCurrentPtr(btnRef);
    if (!btnInstance) return;

    if (isShown) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      btnInstance.style.transform = '';
      return;
    }

    const btnHeight = computeHTMLElementHeight(btnInstance);
    btnInstance.style.transform = `translateY(${btnHeight}px)`;
  }, [isShown]);

  return (
    <button
      className={cn(
        'fixed bottom-0 right-0 m-2 h-10 w-10 cursor-pointer rounded-md bg-card p-2 text-lg font-bold opacity-65 transition-all duration-200 ease-in-out',
        { 'hover:opacity-100 focus:opacity-100': isShown }
      )}
      onClick={
        isShown
          ? () =>
              window.scrollTo({
                behavior: 'smooth',
                top: 0
              })
          : undefined
      }
      aria-hidden={!isShown}
      aria-label={ariaLabel}
      ref={btnRef}
    >
      <ArrowUpIcon />
    </button>
  );
};

export default GoToTopButton;
