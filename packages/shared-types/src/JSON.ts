/* v8 ignore start */
// Stryker disable all
import type { JSPrimitives } from './CustomUtilityTypes';

type JSONPrimitiveLeafs = Exclude<JSPrimitives, undefined>;
type JSONLeafs = JSONPrimitiveLeafs[] | JSONPrimitiveLeafs;

export type JSONKey = string;

export type JSONData = {
  [_: JSONKey]: JSONData[] | JSONLeafs | JSONData;
};

export type TypedLeafsJSONData<LeafsTypes extends JSONLeafs, AllowObjArrays extends 'ALLOW_OBJ_ARRAYS' = never> = {
  [_: JSONKey]: (AllowObjArrays extends never ? never : TypedLeafsJSONData<LeafsTypes>[]) | TypedLeafsJSONData<LeafsTypes> | LeafsTypes;
};
// Stryker restore all
/* v8 ignore stop */
