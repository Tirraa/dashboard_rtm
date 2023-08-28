import { ReactNode } from 'react';

export type Void = undefined;

export type PartialRecord<K extends keyof any, T> = {
  [_ in K]?: T;
};

export type PhantomLayoutProps = {
  children: ReactNode;
};
