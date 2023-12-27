import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import type { MiddlewareFactory } from '@rtm/shared-types/Next';

import { DEFAULT_LANGUAGE } from '##/config/i18n';
import { describe, expect, it } from 'vitest';

import { stackMiddlewares, getPathParts } from '../next';

const fakeMiddleware: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const res = await next(request, _next);
    return res;
  };
};

describe('getPathParts', () => {
  it('should return path parts, given path without i18n flag', () => {
    const pathParts = getPathParts('/_absolutely_not_lang/foo/bar');
    expect(pathParts).toStrictEqual(['_absolutely_not_lang', 'foo', 'bar']);
  });

  it('should return path parts, given path with an i18n flag', () => {
    const pathParts = getPathParts(`/${DEFAULT_LANGUAGE}/foo/bar`);
    expect(pathParts).toStrictEqual(['foo', 'bar']);
  });
});

describe('stackMiddlewares', () => {
  it('should return an instanceof function', () => {
    const foo = stackMiddlewares();
    expect(foo).toBeInstanceOf(Function);
    const bar = stackMiddlewares([]);
    expect(bar).toBeInstanceOf(Function);
    const foo2 = stackMiddlewares([fakeMiddleware]);
    expect(foo2).toBeInstanceOf(Function);
    const bar2 = stackMiddlewares([fakeMiddleware, fakeMiddleware]);
    expect(bar2).toBeInstanceOf(Function);
  });
});
