import type { JSPrimitives } from './CustomUtilityTypes';

type JSONPrimitiveLeafs = Exclude<JSPrimitives, undefined>;
type JSONLeafs = JSONPrimitiveLeafs | JSONPrimitiveLeafs[];

export type JSONKey = string;

export type JSONData = {
  [_: JSONKey]: JSONData | JSONData[] | JSONLeafs;
};

export type TypedLeafsJSONData<LeafsTypes extends JSONLeafs, AllowObjArrays extends 'ALLOW_OBJ_ARRAYS' = never> = {
  [_: JSONKey]: TypedLeafsJSONData<LeafsTypes> | (AllowObjArrays extends never ? never : TypedLeafsJSONData<LeafsTypes>[]) | LeafsTypes;
};
