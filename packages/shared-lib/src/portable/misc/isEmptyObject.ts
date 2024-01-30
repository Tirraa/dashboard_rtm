const isEmptyObject = (obj: object): obj is Record<PropertyKey, never> => Object.keys(obj).length === 0;
export default isEmptyObject;
