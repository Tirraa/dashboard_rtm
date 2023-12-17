import type { JSPrimitives } from '@rtm/shared-types/CustomUtilityTypes';

import isEmptyObject from '../misc/isEmptyObject';

const createURLSearchParams = (searchParams: Record<PropertyKey, JSPrimitives>) =>
  !isEmptyObject(searchParams) ? '?' + new URLSearchParams({ ...(searchParams as any) }).toString() : '';

export default createURLSearchParams;
