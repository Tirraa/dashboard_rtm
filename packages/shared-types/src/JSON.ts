/* v8 ignore start */
// Stryker disable all

type JSONPrimitiveLeafs = boolean | string | number | null;
type JSONLeafs = JSONPrimitiveLeafs[] | JSONPrimitiveLeafs;

export type JSONKey = string;

export type JSONData = {
  [_: JSONKey]: JSONData[] | JSONLeafs | JSONData;
};

export type TypedLeafsJSONData<LeafsTypes extends JSONLeafs, AllowObjArrays extends 'ALLOW_OBJ_ARRAYS' = never> = {
  [K in JSONKey]: AllowObjArrays extends 'ALLOW_OBJ_ARRAYS'
    ? (TypedLeafsJSONData<LeafsTypes, AllowObjArrays> | LeafsTypes)[] | TypedLeafsJSONData<LeafsTypes, AllowObjArrays> | LeafsTypes
    : TypedLeafsJSONData<LeafsTypes, AllowObjArrays> | LeafsTypes;
};

// Stryker restore all
/* v8 ignore stop */
