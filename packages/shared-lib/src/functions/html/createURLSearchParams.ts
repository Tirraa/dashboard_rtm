import type { JSPrimitives } from '@rtm/shared-types/src/CustomUtilityTypes';
import { isEmptyObject } from '../misc/isEmptyObject';

export const createURLSearchParams = (searchParams: Record<string, JSPrimitives>) =>
  !isEmptyObject(searchParams) ? '?' + new URLSearchParams({ ...(searchParams as any) }).toString() : '';

export default createURLSearchParams;
