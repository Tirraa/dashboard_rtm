import strip from 'strip-comments';

export const objInnerToObj = (objInner: string) => eval('({\n' + objInner + '\n})');
export const removeComments = (code: string): string => strip(code, { language: 'ts' });
