import { describe, expect, it } from 'vitest';

import { buildBottomRightWidgets } from '../toolbarInner';

describe('buildBottomRightWidgets', () => {
  it('should return an empty list, given no reason to generate a pagination dropdown', () => {
    const pathname = 'pathname';
    const searchParams = new URLSearchParams();

    const pagesAmount = 1;
    const currentPage = 1;

    const bottomRightWidgets = buildBottomRightWidgets(pathname, searchParams, { pagesAmount, currentPage });
    expect(bottomRightWidgets).toStrictEqual([]);
  });

  it('should match snapshot', () => {
    const pathname = 'pathname';
    const searchParams = new URLSearchParams();

    const pagesAmount = 4;
    const currentPage = 1;

    const bottomRightWidgets = buildBottomRightWidgets(pathname, searchParams, { pagesAmount, currentPage });
    expect(bottomRightWidgets).toMatchSnapshot();
  });
});
