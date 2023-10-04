type JSONPrimitiveLeafs = string | number | boolean | null;
type JSONLeafs = JSONPrimitiveLeafs | JSONPrimitiveLeafs[];

export type JSONData = {
  [_: string]: JSONData | JSONData[] | JSONLeafs;
};

export type TypedLeafsJSONData<LeafsTypes extends JSONLeafs, AllowObjArrays extends 'ALLOW_OBJ_ARRAYS' | never = never> = {
  [_: string]: TypedLeafsJSONData<LeafsTypes> | (AllowObjArrays extends never ? never : TypedLeafsJSONData<LeafsTypes>[]) | LeafsTypes;
};
