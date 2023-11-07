import type { AnchorTarget } from '@/types/HTML';
import type { AppPath } from '@/types/Next';
import type { RefObject } from 'react';

type LinkTargetAttr = undefined | AnchorTarget;

export const getRefCurrentPtr = <T>(ref: RefObject<T>): T => ref.current as T;
export const getLinkTarget = (href: AppPath): LinkTargetAttr => (href.startsWith('http') ? '_blank' : undefined);
