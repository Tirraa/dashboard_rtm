import type { ReactNode } from 'react';

type CustomCrumb = {
  jsx: ReactNode;
  depth: number;
};

export type CustomCrumbs = CustomCrumb[];
