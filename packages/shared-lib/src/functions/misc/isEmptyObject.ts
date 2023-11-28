export const isEmptyObject = (obj: object): obj is {} => Object.keys(obj).length === 0;
export default isEmptyObject;
