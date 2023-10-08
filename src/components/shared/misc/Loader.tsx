'use client';

import LOADER_CONFIG from '@/components/config/styles/loader/colors';
import useLocalStorageTheme from '@/components/hooks/useThemeFromLocalStorage';
import { CSSProperties, FunctionComponent } from 'react';
import { BeatLoader } from 'react-spinners';

interface LoaderProps {
  override?: CSSProperties;
}

const { COLORS, DEFAULT_COLOR } = LOADER_CONFIG;

const Loader: FunctionComponent<LoaderProps> = ({ override: cssOverride } = {}) => {
  const currentTheme = useLocalStorageTheme();
  const color = currentTheme ? COLORS[currentTheme] : DEFAULT_COLOR;

  return (
    <div className="cursor-wait select-none z-50 fixed inset-0 flex items-center justify-center w-full h-screen">
      <BeatLoader {...{ color, cssOverride }} margin={4.5} speedMultiplier={1.35} loading={true} aria-label="..." className="animate-pulse" />
    </div>
  );
};

export default Loader;
