import type { Limit } from '@rtm/shared-types/Numbers';

export const MIN_MAX_SIZE = 1;

class SlidingList {
  private elements: unknown[];
  private maxSize: Limit;

  /**
   * @throws {RangeError}
   */
  constructor(maxSize: Limit) {
    if (maxSize < MIN_MAX_SIZE) throw new RangeError(`maxSize must be at least ${MIN_MAX_SIZE}`);

    this.maxSize = maxSize;
    this.elements = [];
  }

  push(...elements: unknown[]): void {
    for (const element of elements) {
      if (this.elements.length >= this.maxSize) this.elements.shift();
      this.elements.push(element);
    }
  }

  getSnapshot(): unknown[] {
    return [...this.elements];
  }

  getPtr(): unknown[] {
    return this.elements;
  }
}

export default SlidingList;
