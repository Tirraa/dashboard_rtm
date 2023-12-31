import type { Element as hASTElement } from 'hast';

function addClassname(node: hASTElement, classNameToAppend: string) {
  if (Array.isArray(node.properties.className)) {
    node.properties.className.push(classNameToAppend);
  } else {
    node.properties.className = typeof node.properties.className === 'string' ? [node.properties.className, classNameToAppend] : classNameToAppend;
  }
}

export default addClassname;
