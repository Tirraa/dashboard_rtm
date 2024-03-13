// https://www.robinwieruch.de/react-hook-scroll-direction/

import { useEffect, useState, useRef } from 'react';

const THRESHOLD = 0;

type ScrollDirection = 'down' | 'up';

const useScrollDirection = (): [ScrollDirection, React.Dispatch<React.SetStateAction<ScrollDirection>>] => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('down');

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const prevScrollY = useRef(-1);
  const blocking = useRef(false);

  useEffect(() => {
    prevScrollY.current = window.scrollY;

    const updateScrollDirection = () => {
      const { scrollY } = window;

      if (Math.abs(scrollY - prevScrollY.current) >= THRESHOLD) {
        const newScrollDirection = scrollY > prevScrollY.current ? 'down' : 'up';
        setScrollDirection(newScrollDirection);
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        prevScrollY.current = Math.max(0, scrollY);
      }
      blocking.current = false;
    };

    const onScroll = () => {
      if (blocking.current) return;
      blocking.current = true;
      window.requestAnimationFrame(updateScrollDirection);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return [scrollDirection, setScrollDirection];
};

export default useScrollDirection;
