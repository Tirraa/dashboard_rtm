import { isEmptyObject } from '../../../lib/misc/isEmptyObject';
import type { JSPrimitives } from '../../../types/CustomUtilitaryTypes';

export const createURLSearchParams = (searchParams: Record<string, JSPrimitives>) =>
  !isEmptyObject(searchParams) ? '?' + new URLSearchParams({ ...(searchParams as any) }).toString() : '';

export default createURLSearchParams;
