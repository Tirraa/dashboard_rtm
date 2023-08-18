import { RefObject } from 'react';

export function getRefCurrentPtr<T>(ref: RefObject<T>) {
  return ref.current as T;
}
