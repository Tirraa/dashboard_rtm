import { Element as hASTElement } from 'hast';

export function addClassname(node: hASTElement, classNameToAppend: string) {
  if (Array.isArray(node.properties.className)) {
    node.properties.className.push(classNameToAppend);
  } else {
    node.properties.className =
      typeof node.properties.className === 'string' ? [classNameToAppend].push(node.properties.className) : [classNameToAppend];
  }
}
