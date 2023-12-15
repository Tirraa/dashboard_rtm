import { describe, expect, it } from 'vitest';
import buildPageTitle from '../buildPageTitle';

const pageTitle = 'FOO';
const productTitle = 'PRODUCT';
const sep = ' | ';

describe('buildPageTitle', () => {
  it("should return '{productTitle} | {pageTitle}'", () => {
    expect(buildPageTitle(productTitle, pageTitle, true)).toBe(`${productTitle}${sep}${pageTitle}`);
  });

  it("should return 'foo | {productTitle}'", () => {
    expect(buildPageTitle(productTitle, 'foo')).toBe(`foo${sep}${productTitle}`);
  });

  it("should return '{productTitle} | '", () => {
    expect(buildPageTitle(productTitle, '', true)).toBe(`${productTitle}${sep}`);
  });

  it("should return ' | {productTitle}'", () => {
    expect(buildPageTitle(productTitle, '')).toBe(`${sep}${productTitle}`);
  });
});
