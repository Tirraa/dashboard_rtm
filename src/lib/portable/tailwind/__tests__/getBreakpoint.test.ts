import { afterAll, describe, expect, it, vi } from 'vitest';
import getBreakpoint from '../getBreakpoint';

vi.mock('tailwind.config', async () => {
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
  afterAll(() => {
    vi.doUnmock('tailwind.config');
  });

  it('should return the correct breakpoint value', () => {
    expect(getBreakpoint('sm')).toBe(279);
    expect(getBreakpoint('md')).toBe(729);
  });

  it('should return NaN for an invalid breakpoint', () => {
    expect(getBreakpoint('foo' as any)).toBeNaN();
  });
});
