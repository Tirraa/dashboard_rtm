/* v8 ignore start */
// Stryker disable all

import type { ReactNode } from 'react';

import type { Index } from './Numbers';

type CustomCrumb = {
  jsx: ReactNode;
  depth: Index;
};

export type CustomCrumbs = CustomCrumb[];

// Stryker restore all
/* v8 ignore stop */
