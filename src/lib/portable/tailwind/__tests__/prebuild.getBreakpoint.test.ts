import { describe, expect, it, vi } from 'vitest';

import { getBreakpoint } from '../../../tailwind';

vi.mock('tailwind.config', () => {
  return {
    default: {
      theme: {
        screens: {
          sm: '279px',
          md: '729px'
        }
      }
    }
  };
});

describe('getBreakpoint', () => {
  it('should return the correct breakpoint value', () => {
    // eslint-disable-next-line no-magic-numbers
    expect(getBreakpoint('sm')).toBe(279);
    // eslint-disable-next-line no-magic-numbers
    expect(getBreakpoint('md')).toBe(729);
  });

  it('should return NaN for an invalid breakpoint', () => {
    // @ts-expect-error
    expect(getBreakpoint('foo')).toBeNaN();
  });
});

vi.doUnmock('tailwind.config');
