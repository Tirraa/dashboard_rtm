import { parse } from '@babel/parser';

import type { I18nJSONPart } from '../types/Metadatas';

export function objInnerToObj(objInner: string): I18nJSONPart {
  let res = {};
  try {
    const obj = JSON.parse('{\n' + objInner + '\n}');
    return obj;
  } catch {
    try {
      const parsedObject = parse(`({${objInner}})`, {
        sourceType: 'unambiguous',
        plugins: []
      });

      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (parsedObject.program.body[0]?.type === 'ExpressionStatement' && parsedObject.program.body[0].expression.type === 'ObjectExpression') {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const objExpression = parsedObject.program.body[0].expression;
        const obj: I18nJSONPart = objExpression.properties.reduce((accumulator: I18nJSONPart, prop) => {
          if (prop.type === 'ObjectProperty') {
            let key: string;
            if (prop.key.type === 'Identifier') {
              key = prop.key.name;
            } else if (prop.key.type === 'StringLiteral') {
              key = prop.key.value;
            } else {
              throw new Error(`Unsupported key type: ${prop.key.type}`);
            }

            let value: string | null = null;
            if (prop.value.type === 'StringLiteral') {
              value = prop.value.value;
            } else {
              throw new Error(`Unsupported value type: ${prop.value.type}`);
            }
            accumulator[key] = value;
          }
          return accumulator;
        }, {});
        res = obj;
      }
    } catch (babelError) {
      throw babelError;
    }
  }
  return res;
}
