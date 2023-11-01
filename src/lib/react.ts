import type { AppPath } from '@/types/Next';
import type { RefObject } from 'react';

type LinkTargetAttr = { target: AppPath };

export const getRefCurrentPtr = <T>(ref: RefObject<T>): T => ref.current as T;
export const getLinkTarget = (href: AppPath): {} | LinkTargetAttr => (href.startsWith('http') ? { target: '_blank' } : {});
