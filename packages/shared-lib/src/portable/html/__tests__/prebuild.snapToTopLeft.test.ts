import { afterAll, describe, expect, it, vi } from 'vitest';

import snapToTopLeft from '../snapToTopLeft';

vi.spyOn(global, 'scrollTo');

describe('snapToTopLeft', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should call window.scrollTo with { behavior: 'instant', left: 0, top: 0 }", () => {
    snapToTopLeft();
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(global.scrollTo).toHaveBeenCalledWith({ behavior: 'instant', left: 0, top: 0 });
  });

  it('should scroll to the top of the item, given an HTMLElement item', () => {
    const fakeDiv = document.createElement('div');
    const spy = vi.spyOn(fakeDiv, 'scrollTo');

    snapToTopLeft(fakeDiv);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(spy).toHaveBeenCalledWith({ behavior: 'instant', left: 0, top: 0 });
  });
});
