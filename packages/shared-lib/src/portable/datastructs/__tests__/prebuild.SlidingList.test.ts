import { describe, expect, it } from 'vitest';

import SlidingList, { MIN_MAX_SIZE } from '../SlidingList';

describe('SlidingList', () => {
  it('should add all elements to the list, given toAdd elements length matching maxSize', () => {
    const maxSize = 3;
    const slidingList = new SlidingList(maxSize);

    const toAdd: number[] = [];
    for (let n = 0; n < maxSize; n++) toAdd.push(n);

    for (const n of toAdd) slidingList.push(n);

    expect(slidingList.getPtr()).toStrictEqual(toAdd);
    expect(slidingList.getSnapshot()).toStrictEqual(toAdd);
  });

  it('should slide, given toAdd elements length bigger than maxSize', () => {
    const maxSize = 2;
    const slidingList = new SlidingList(maxSize);

    const toAdd: number[] = [];
    for (let n = 0; n <= maxSize; n++) toAdd.push(n);

    for (const n of toAdd) slidingList.push(n);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const result = toAdd.slice(1);

    expect(slidingList.getPtr()).toStrictEqual(result);
    expect(slidingList.getSnapshot()).toStrictEqual(result);
  });

  it('should respect mutable and immutable scenarios', () => {
    const maxSize = 2;
    const slidingList = new SlidingList(maxSize);

    const toAdd: number[] = [];
    for (let n = 0; n < maxSize; n++) toAdd.push(n);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const toAddHead = toAdd.slice(0, toAdd.length - 1);
    slidingList.push(...toAddHead);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const toAddTail = toAdd[toAdd.length - 1];

    const elementsPtr = slidingList.getPtr();
    const elementsSnapshot = slidingList.getSnapshot();

    slidingList.push(toAddTail);

    expect(elementsPtr).toStrictEqual(toAdd);
    expect(elementsSnapshot).toStrictEqual(toAddHead);

    expect(slidingList.getPtr()).toStrictEqual(toAdd);
    expect(slidingList.getSnapshot()).toStrictEqual(toAdd);
  });

  it('should throw, given invalid maxSize', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect.assertions(1);

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const invalidMaxSize = MIN_MAX_SIZE - 1;

    try {
      new SlidingList(invalidMaxSize);
    } catch (interceptedError) {
      expect(interceptedError).toBeInstanceOf(RangeError);
    }
  });
});
