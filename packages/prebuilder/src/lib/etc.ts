// eslint-disable-next-line
export const objInnerToObj = (objInner: string): any => eval('({\n' + objInner + '\n})');
