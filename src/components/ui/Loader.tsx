'use client';

import LOADER_COLORS from '@/components/config/styles/loader/colors';
import type { CSSProperties, FunctionComponent } from 'react';
import { BeatLoader } from 'react-spinners';

interface LoaderProps {
  override?: CSSProperties;
}

const { BACKGROUND_COLOR, COLOR } = LOADER_COLORS;

export const Loader: FunctionComponent<LoaderProps> = ({ override: cssOverride } = {}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex h-screen w-full cursor-wait select-none items-center justify-center"
      style={{ backgroundColor: BACKGROUND_COLOR }}
    >
      <BeatLoader
        color={COLOR}
        cssOverride={cssOverride}
        margin={4.5}
        speedMultiplier={1.35}
        loading={true}
        aria-label="..."
        className="animate-pulse"
      />
    </div>
  );
};

export default Loader;
