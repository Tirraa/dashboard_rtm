import type { ReactNode } from 'react';

type CustomCrumb = {
  depth: number;
  jsx: ReactNode;
};

export type CustomCrumbs = CustomCrumb[];
