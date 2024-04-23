// https://www.robinwieruch.de/react-hook-scroll-direction/

import type { SetStateAction, Dispatch } from 'react';

import { MINIMAL_THROTTLE_TIMING_IN_MS } from '@/config/throttling';
import { useEffect, useState, useRef } from 'react';
import throttle from 'throttleit';

const THRESHOLD = 0;

type ScrollDirection = 'down' | 'up';

const useScrollDirection = (): [ScrollDirection, Dispatch<SetStateAction<ScrollDirection>>] => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('down');

  // eslint-disable-next-line no-magic-numbers
  const prevScrollY = useRef(-1);
  const blocking = useRef(false);

  useEffect(() => {
    prevScrollY.current = window.scrollY;

    const updateScrollDirection = () => {
      const { scrollY } = window;

      if (Math.abs(scrollY - prevScrollY.current) >= THRESHOLD) {
        const newScrollDirection = scrollY > prevScrollY.current ? 'down' : 'up';
        setScrollDirection(newScrollDirection);
        // eslint-disable-next-line no-magic-numbers
        prevScrollY.current = Math.max(0, scrollY);
      }
      blocking.current = false;
    };

    const handleScroll = () => {
      if (blocking.current) return;
      blocking.current = true;
      window.requestAnimationFrame(updateScrollDirection);
    };

    const throttledScrollHandler = throttle(handleScroll, MINIMAL_THROTTLE_TIMING_IN_MS);

    window.addEventListener('scroll', throttledScrollHandler);
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, []);

  return [scrollDirection, setScrollDirection];
};

export default useScrollDirection;
