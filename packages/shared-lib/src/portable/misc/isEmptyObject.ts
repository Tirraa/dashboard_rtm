// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const isEmptyObject = (obj: object): obj is Record<PropertyKey, never> => Object.keys(obj).length === 0;
export default isEmptyObject;
