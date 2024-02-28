import type { ObjectProperty } from '@babel/types';

import { parse } from '@babel/parser';

import type { I18nJSONPart } from '../types/Metadatas';

/**
 * @throws {Error}
 */
function getPropKey(prop: ObjectProperty) {
  if (prop.key.type === 'Identifier') return prop.key.name;
  if (prop.key.type === 'StringLiteral') return prop.key.value;

  throw new Error(`Unsupported key type: ${prop.key.type}`);
}

/**
 * @throws {Error}
 */
function getPropValue(prop: ObjectProperty) {
  if (prop.value.type !== 'StringLiteral') {
    throw new Error(`Unsupported value type: ${prop.value.type}`);
  }
  return prop.value.value;
}

/**
 * @throws {Error}
 */
export function localesInfosInnerToObj(objInner: string): I18nJSONPart {
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
            const key = getPropKey(prop);
            const value = getPropValue(prop);
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
