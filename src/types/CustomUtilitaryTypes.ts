import { ReactNode } from 'react';

export type LayoutMinimalProps = {
  children: ReactNode;
};

export type RequiredFieldsOnly<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K];
};
