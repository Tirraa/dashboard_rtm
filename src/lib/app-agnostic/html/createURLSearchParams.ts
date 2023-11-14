import type { JSPrimitives } from '@/types/CustomUtilitaryTypes';
import { isEmptyObject } from '../../../lib/misc/isEmptyObject';

export const createURLSearchParams = (searchParams: Record<string, JSPrimitives>) =>
  !isEmptyObject(searchParams) ? '?' + new URLSearchParams({ ...(searchParams as any) }).toString() : '';

export default createURLSearchParams;
