import { describe, expect, it } from 'vitest';
import { createElement } from 'react';

import { getPaginatedElementsCurrentSlice } from '../paginatedElements';

describe('getPaginatedElementsCurrentSlice', () => {
  const pageSize = 10;
  const pagesAmount = 10;
  const totalPages = pageSize * pagesAmount;

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers, @typescript-eslint/no-unused-vars
  const elements = Array.from({ length: totalPages }, (_, i) => createElement('div', { key: i }, `ReactElement ${i + 1}`));

  it('should return the correct slice for the first page', () => {
    const page = 1;
    const slice = getPaginatedElementsCurrentSlice(page, pageSize, elements);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(slice).toStrictEqual(elements.slice(0, 10));
  });

  it('should return the correct slice for the 5th page', () => {
    const page = 5;
    const slice = getPaginatedElementsCurrentSlice(page, pageSize, elements);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(slice).toStrictEqual(elements.slice(40, 50));
  });

  it('should return elements, given bigger pageSize than elements length', () => {
    const page = 1;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const slice = getPaginatedElementsCurrentSlice(page, totalPages + 1, elements);
    expect(slice).toStrictEqual(elements);
  });

  it('should return an empty array for a page that does not exist', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const page = pagesAmount + 1;
    const slice = getPaginatedElementsCurrentSlice(page, pageSize, elements);
    expect(slice).toStrictEqual([]);
  });

  it('should handle page 0 as the first page', () => {
    const page = 0;
    const slice = getPaginatedElementsCurrentSlice(page, pageSize, elements);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(slice).toStrictEqual(elements.slice(0, 10));
  });

  it('should handle negative page as the first page', () => {
    const page = -1;
    const slice = getPaginatedElementsCurrentSlice(page, pageSize, elements);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(slice).toStrictEqual(elements.slice(0, 10));
  });
});
