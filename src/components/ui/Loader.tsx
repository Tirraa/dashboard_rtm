'use client';

import LOADER_CONFIG from '@/components/config/styles/loader/colors';
import type { ThemeVariant } from '@/config/themes';
import { useTheme } from 'next-themes';
import type { CSSProperties, FunctionComponent } from 'react';
import { BeatLoader } from 'react-spinners';

interface LoaderProps {
  override?: CSSProperties;
}

const { COLORS, DEFAULT_COLOR } = LOADER_CONFIG;

export const Loader: FunctionComponent<LoaderProps> = ({ override: cssOverride } = {}) => {
  const { theme } = useTheme();
  const color = theme ? COLORS[theme as ThemeVariant] : DEFAULT_COLOR;

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-full cursor-wait select-none items-center justify-center">
      <BeatLoader {...{ color, cssOverride }} margin={4.5} speedMultiplier={1.35} loading={true} aria-label="..." className="animate-pulse" />
    </div>
  );
};

export default Loader;
