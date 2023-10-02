import { useEffect } from 'react';

const useResetScroll = () =>
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

export default useResetScroll;
