/* v8 ignore start */
// Stryker disable all
'use client';

import type { FunctionComponent, CSSProperties } from 'react';

import LOADER_COLORS from '@/components/config/styles/loader/colors';
import { BeatLoader } from 'react-spinners';

interface LoaderProps {
  override?: CSSProperties;
}

const { BACKGROUND_COLOR, COLOR } = LOADER_COLORS;

const Loader: FunctionComponent<LoaderProps> = ({ override: cssOverride } = {}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex h-screen w-full cursor-wait select-none items-center justify-center"
      style={{ backgroundColor: BACKGROUND_COLOR }}
    >
      <BeatLoader
        cssOverride={cssOverride}
        className="animate-pulse"
        speedMultiplier={1.35}
        aria-label="..."
        loading={true}
        color={COLOR}
        margin={4.5}
      />
    </div>
  );
};

export default Loader;
/* v8 ignore stop */
// Stryker restore all
