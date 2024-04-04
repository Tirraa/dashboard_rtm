import { describe, expect, it } from 'vitest';

import { buildBottomWidgets } from '../toolbarInner';

describe('buildBottomWidgets', () => {
  it('should return an empty list, given no reason to generate a pagination dropdown', () => {
    const pathname = 'pathname';
    const searchParams = new URLSearchParams();

    const pagesAmount = 1;
    const currentPage = 1;

    const bottomWidgets = buildBottomWidgets(pathname, searchParams, { pagesAmount, currentPage });
    expect(bottomWidgets).toStrictEqual([]);
  });

  it('should match snapshot', () => {
    const pathname = 'pathname';
    const searchParams = new URLSearchParams();

    const pagesAmount = 4;
    const currentPage = 1;

    const bottomWidgets = buildBottomWidgets(pathname, searchParams, { pagesAmount, currentPage });
    expect(bottomWidgets).toMatchSnapshot();
  });
});
