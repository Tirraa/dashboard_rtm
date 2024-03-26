export const MIN_MAX_SIZE = 1;

class SlidingList {
  private elements: unknown[];
  private maxSize: number;

  /**
   * @throws {RangeError}
   */
  constructor(maxSize: number) {
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
