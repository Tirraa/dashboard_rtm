"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const vitest_1 = require("vitest");
const etc_1 = require("../etc");
(0, vitest_1.describe)('objInnerToObj', () => {
    (0, vitest_1.it)('should return an obj, given a valid obj inner', () => {
        const objInner = `
      foo: 'bar',
      bar: 'foo',
    `;
        (0, vitest_1.expect)((0, etc_1.objInnerToObj)(objInner)).toStrictEqual({ foo: 'bar', bar: 'foo' });
    });
});
