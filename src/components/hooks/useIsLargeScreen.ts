/* v8 ignore start */
// Stryker disable all

import getBreakpoint from '@/lib/portable/tailwind/getBreakpoint';
import { useMediaQuery } from '@react-hook/media-query';

const useIsLargeScreen = () => {
  const isLargeScreen = useMediaQuery(`(min-width: ${getBreakpoint('lg')}px)`);
  return isLargeScreen;
};

export default useIsLargeScreen;

// Stryker restore all
/* v8 ignore stop */
