import type { RefObject } from 'react';

export const getRefCurrentPtr = <T>(ref: RefObject<T>): T => ref.current as T;
export default getRefCurrentPtr;
