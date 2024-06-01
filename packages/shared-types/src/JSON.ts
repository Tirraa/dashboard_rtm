/* v8 ignore start */
// Stryker disable all

type JSONPrimitiveLeafs = boolean | string | number | null;
type JSONLeafs = JSONPrimitiveLeafs[] | JSONPrimitiveLeafs;

export type JSONKey = string;

export type JSONData = {
  [_: JSONKey]: JSONData[] | JSONLeafs | JSONData;
};

// Stryker restore all
/* v8 ignore stop */
