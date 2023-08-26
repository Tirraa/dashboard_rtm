import { ReactNode } from 'react';

export interface LayoutBaseProps {
  children: ReactNode;
}

export type Pathname = string;
export type PathnameSegment = string;

export default LayoutBaseProps;
