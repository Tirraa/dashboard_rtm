/* v8 ignore start */
// Stryker disable all

import { useMediaQuery } from '@react-hook/media-query';
import { getBreakpoint } from '@/lib/tailwind';

const useIsLargeScreen = () => {
  const isLargeScreen = useMediaQuery(`(min-width: ${getBreakpoint('lg')}px)`);
  return isLargeScreen;
};

export default useIsLargeScreen;

// Stryker restore all
/* v8 ignore stop */
