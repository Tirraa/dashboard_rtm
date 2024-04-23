import type { MockInstance } from 'vitest';

import { beforeAll, afterAll, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';

import useScrollDirection from '../useScrollDirection';

const LEFT_PART = 0;
const RIGHT_PART = 1;

describe('useScrollDirection', () => {
  let windowRequestAnimationFrameMock: MockInstance<[callback: FrameRequestCallback]>;

  beforeAll(() => {
    windowRequestAnimationFrameMock = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(
      vi.fn((cb) => {
        // eslint-disable-next-line no-magic-numbers
        cb(0);
        // eslint-disable-next-line no-magic-numbers
        return 0;
      })
    );
  });

  it('should return initial scroll direction as down, and test the dispatcher', () => {
    const { result } = renderHook(() => useScrollDirection());
    expect(result.current[LEFT_PART]).toBe('down');

    expect(typeof result.current[RIGHT_PART]).toBe('function');

    act(() => {
      result.current[RIGHT_PART]('up');
    });

    expect(result.current[LEFT_PART]).toBe('up');
  });

  it('should update scroll direction when window scrolls', async () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));

      window.scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => expect(result.current[LEFT_PART]).toBe('up'));

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => expect(result.current[LEFT_PART]).toBe('down'));
  });

  afterAll(() => {
    windowRequestAnimationFrameMock.mockReset();
  });
});

describe('useScrollDirection (not mocking window.requestAnimationFrame)', () => {
  it('should NOT update scroll direction when (blocking is true)', () => {
    const { result } = renderHook(() => useScrollDirection());

    act(() => {
      window.scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current[LEFT_PART]).toBe('down');

    act(() => {
      window.scrollY = 100;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current[LEFT_PART]).toBe('down');
  });
});
