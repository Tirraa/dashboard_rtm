import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

import { clearAll, getClock, getOrSet, get, set } from '../generic';

describe('get and set', () => {
  afterEach(() => {
    clearAll();
    vi.useRealTimers();
  });

  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should set the value with a clock, then destroy it (TTL invalidation)', () => {
    // eslint-disable-next-line no-magic-numbers
    const [key, data, ttl] = ['key', '__VALUE__', 1e4];
    set(key, data, ttl);

    const [value, clock] = [get(key), getClock(key)];

    // eslint-disable-next-line no-magic-numbers
    set(key, data, -1);
    const destroyedClock = getClock(key);

    expect(value).toBe(data);
    expect(clock).toEqual({ cachedAt: expect.any(Number), ttl });
    expect(destroyedClock).toBe(undefined);
  });

  it('should set the value with a clock, then destroy the value (timed out)', () => {
    // eslint-disable-next-line no-magic-numbers
    const [key, data, ttl] = ['key', '__VALUE__', 1];
    set(key, data, ttl);

    vi.advanceTimersByTime(ttl);

    const value = get(key);
    expect(value).toBe(undefined);
  });
});

describe('get or set', () => {
  afterEach(() => {
    clearAll();
    vi.useRealTimers();
  });

  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('should set the value with a clock, then destroy the value (timed out)', async () => {
    // eslint-disable-next-line no-magic-numbers
    const [key, data, data2, ttl] = ['key', '__VALUE__', '__VALUE_2__', 1];
    // eslint-disable-next-line require-await
    await getOrSet(key, async () => data, ttl);
    const firstValue = get(key);

    // eslint-disable-next-line require-await
    await getOrSet(key, async () => data2, ttl);
    const stillFirstValue = get(key);

    vi.advanceTimersByTime(ttl);

    const invalidatedFirstValue = get(key);

    // eslint-disable-next-line require-await
    const lastValue = await getOrSet(key, async () => data2, ttl);

    expect(firstValue).toBe(data);
    expect(stillFirstValue).toBe(firstValue);
    expect(invalidatedFirstValue).toBe(undefined);
    expect(lastValue).toBe(data2);
  });
});
