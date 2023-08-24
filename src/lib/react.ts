import { RefObject } from 'react';

type LinkTargetAttr = { target: string };

export const getRefCurrentPtr = <T>(ref: RefObject<T>): T => ref.current as T;
export const getLinkTarget = (href: string): {} | LinkTargetAttr => (href.startsWith('http') ? { target: '_blank' } : {});
