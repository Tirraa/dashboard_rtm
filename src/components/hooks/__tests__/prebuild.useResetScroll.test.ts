import * as resetScrollModule from '@rtm/shared-lib/portable/html/resetScroll';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import useResetScroll from '../useResetScroll';

describe('useResetScroll', () => {
  it('should call resetScroll with disabled extra effects flags', () => {
    const resetScrollMock = vi.spyOn(resetScrollModule, 'default');

    renderHook(() => useResetScroll());

    expect(resetScrollMock).toHaveBeenCalledWith(undefined, false);
  });

  it('should call resetScroll with disabled also reset scroll flag by default', () => {
    const resetScrollMock = vi.spyOn(resetScrollModule, 'default');

    const scrollableElementToResetRef = { current: document.createElement('div') };

    renderHook(() => useResetScroll(scrollableElementToResetRef));

    expect(resetScrollMock).toHaveBeenCalledWith(scrollableElementToResetRef, false);
  });

  it('should call resetScroll with disabled also reset scroll flag if specified', () => {
    const resetScrollMock = vi.spyOn(resetScrollModule, 'default');

    const alsoResetWindowScroll = false;
    const scrollableElementToResetRef = { current: document.createElement('div') };

    renderHook(() => useResetScroll(scrollableElementToResetRef, { alsoResetWindowScroll }));

    expect(resetScrollMock).toHaveBeenCalledWith(scrollableElementToResetRef, false);
  });

  it('should call resetScroll on initial render and NOT on re-render if no additional dep is specified, nor changing', () => {
    const resetScrollMock = vi.spyOn(resetScrollModule, 'default');

    const scrollableElementToResetRef = { current: document.createElement('div') };
    const alsoResetWindowScroll = true;

    const { rerender } = renderHook(() => useResetScroll(scrollableElementToResetRef, { alsoResetWindowScroll }));

    expect(resetScrollMock).toHaveBeenCalledWith(scrollableElementToResetRef, alsoResetWindowScroll);

    resetScrollMock.mockClear();

    rerender();

    expect(resetScrollMock).not.toHaveBeenCalled();
  });

  it('should call resetScroll on initial render and additional dep state change', () => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const [firstState, secondState] = [1, 2];
    const resetScrollMock = vi.spyOn(resetScrollModule, 'default');

    const scrollableElementToResetRef = { current: document.createElement('div') };
    const alsoResetWindowScroll = true;

    const { rerender } = renderHook(({ additionalDep }) => useResetScroll(scrollableElementToResetRef, { alsoResetWindowScroll, additionalDep }), {
      initialProps: { additionalDep: firstState }
    });

    expect(resetScrollMock).toHaveBeenCalledWith(scrollableElementToResetRef, alsoResetWindowScroll);

    resetScrollMock.mockClear();

    rerender({ additionalDep: secondState });

    expect(resetScrollMock).toHaveBeenCalledWith(scrollableElementToResetRef, alsoResetWindowScroll);
  });
});
