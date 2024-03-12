'use client';

import type { FunctionComponent } from 'react';

import { ArrowUpIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/tailwind';

interface GoToTopButtonProps {
  scrollYthreshold?: number;
}

const SCROLL_Y_THRESHOLD_DEFAULT = 400;

const GoToTopButton: FunctionComponent<GoToTopButtonProps> = ({ scrollYthreshold: scrollYthresholdValue }) => {
  const [isShown, setIsShown] = useState<boolean>(false);

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

  return (
    <button
      className={cn(
        'fixed bottom-0 right-0 m-2 h-10 w-10 cursor-pointer rounded-md bg-card p-2 text-lg font-bold opacity-65 transition-opacity duration-200 ease-in-out hover:opacity-100',
        {
          'cursor-default opacity-0': !isShown
        }
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
    >
      <ArrowUpIcon />
    </button>
  );
};

export default GoToTopButton;
