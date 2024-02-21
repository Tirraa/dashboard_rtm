import { afterAll, describe, expect, it, vi } from 'vitest';

import scrollToTop from '../scrollToTop';

vi.spyOn(global, 'scrollTo');

describe('scrollToTop', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('should call window.scrollTo with 0, 0', () => {
    scrollToTop();
    // eslint-disable-next-line no-magic-numbers
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('should scroll to the top of the item, given an HTMLElement item', () => {
    const fakeDiv = document.createElement('div');
    const spy = vi.spyOn(fakeDiv, 'scrollTo');

    scrollToTop(fakeDiv);
    // eslint-disable-next-line no-magic-numbers
    expect(spy).toHaveBeenCalledWith(0, 0);
  });
});
