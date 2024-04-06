import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import * as LibHTML from '@/lib/html';

import useLockScreenScrollY, { EFFECT_CLASSES } from '../useLockScreenScrollY';

describe('useLockScreenScrollY', () => {
  it('should add and remove classes on mount and unmount', () => {
    const getBodyContainerMock = vi.spyOn(LibHTML, 'getBodyContainer');

    const bodyContainer = document.createElement('div');
    getBodyContainerMock.mockReturnValue(bodyContainer);

    const { unmount } = renderHook(() => useLockScreenScrollY());

    for (const effectClass of EFFECT_CLASSES) {
      expect(bodyContainer.classList.contains(effectClass)).toBe(true);
    }

    unmount();

    for (const effectClass of EFFECT_CLASSES) {
      expect(bodyContainer.classList.contains(effectClass)).toBe(false);
    }
  });
});
