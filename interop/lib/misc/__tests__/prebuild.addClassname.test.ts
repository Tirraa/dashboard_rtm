import type { Element as hASTElement } from 'hast';

import { describe, expect, it } from 'vitest';

import addClassname from '../addClassname';

describe('addClassname', () => {
  it('should pass, given array input and expecting array output', () => {
    const node: hASTElement = {
      properties: {
        className: ['foo']
      },
      type: 'element',
      tagName: 'div',
      children: []
    };
    addClassname(node, 'bar');
    expect(node.properties.className).toStrictEqual(['foo', 'bar']);
  });

  it('should pass, given string input and expecting array output', () => {
    const node: hASTElement = {
      properties: {
        className: 'foo'
      },
      type: 'element',
      tagName: 'div',
      children: []
    };
    addClassname(node, 'bar');
    expect(node.properties.className).toStrictEqual(['foo', 'bar']);
  });

  it('should pass, given null input and expecting string output', () => {
    const node: hASTElement = {
      properties: {
        className: null
      },
      type: 'element',
      tagName: 'div',
      children: []
    };
    addClassname(node, 'foo');
    expect(node.properties.className).toBe('foo');
  });
});
