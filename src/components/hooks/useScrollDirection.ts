// https://www.robinwieruch.de/react-hook-scroll-direction/

import { useEffect, useState, useRef } from 'react';

const THRESHOLD = 0;

type ScrollDirection = 'down' | 'up';

const useScrollDirection = (): [ScrollDirection, React.Dispatch<React.SetStateAction<ScrollDirection>>] => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('down');

  const blocking = useRef(false);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const prevScrollY = useRef(0);

  useEffect(() => {
    prevScrollY.current = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - prevScrollY.current) >= THRESHOLD) {
        const newScrollDirection = scrollY > prevScrollY.current ? 'down' : 'up';

        setScrollDirection(newScrollDirection);

        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        prevScrollY.current = scrollY > 0 ? scrollY : 0;
      }

      blocking.current = false;
    };

    const onScroll = () => {
      if (!blocking.current) {
        blocking.current = true;
        window.requestAnimationFrame(updateScrollDirection);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return [scrollDirection, setScrollDirection];
};

export { useScrollDirection };
