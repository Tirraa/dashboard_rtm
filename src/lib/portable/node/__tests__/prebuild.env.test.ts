import { beforeEach, afterAll, describe, expect, test, it, vi } from 'vitest';
import NODE_ENV from '𝕍/setEnv';

import type ComputedNodeCtx from '../env';

const getCtx = async () => (await import('../env')).default as typeof ComputedNodeCtx;

const NODE_ENV_KEY = 'NODE_ENV';

describe('ComputedNodeCtx', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
    vi.spyOn(console, 'warn').mockImplementationOnce(vi.fn(() => {}));
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  it('should have all values to false, except TEST', async () => {
    const ctx = await getCtx();

    for (const k of Object.keys(ctx)) {
      const k2 = k as keyof typeof ctx;
      if (k2 === 'TEST') expect(ctx[k2]).toBe(true);
      else expect(ctx[k2]).toBe(false);
    }
  });

  it('should have all values to false, except DEV', async () => {
    vi.stubEnv(NODE_ENV_KEY, 'development');
    const ctx = await getCtx();

    for (const k of Object.keys(ctx)) {
      const k2 = k as keyof typeof ctx;
      if (k2 === 'DEV') expect(ctx[k2]).toBe(true);
      else expect(ctx[k2]).toBe(false);
    }
  });

  it('should have all values to false, except PROD', async () => {
    vi.stubEnv(NODE_ENV_KEY, 'production');
    const ctx = await getCtx();

    for (const k of Object.keys(ctx)) {
      const k2 = k as keyof typeof ctx;
      if (k2 === 'PROD') expect(ctx[k2]).toBe(true);
      else expect(ctx[k2]).toBe(false);
    }
  });

  it('should fallback on PROD, given an unknown NODE_ENV value', async () => {
    vi.stubEnv(NODE_ENV_KEY, '$');
    const ctx = await getCtx();

    for (const k of Object.keys(ctx)) {
      const k2 = k as keyof typeof ctx;
      if (k2 === 'PROD') expect(ctx[k2]).toBe(true);
      else expect(ctx[k2]).toBe(false);
    }
  });
});

describe('ComputedNodeCtx (undefined NODE_ENV)', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    vi.resetModules();
    vi.spyOn(console, 'warn').mockImplementationOnce(vi.fn(() => {}));

    // * ... Workaround: if we only reassign process.env.NODE_ENV or just stub it, the coverage decreases
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should fallback on PROD, given an undefined NODE_ENV value', async () => {
    // @ts-expect-error
    process.env.NODE_ENV = undefined;
    const ctx = await getCtx();

    for (const k of Object.keys(ctx)) {
      const k2 = k as keyof typeof ctx;
      if (k2 === 'PROD') expect(ctx[k2]).toBe(true);
      else expect(ctx[k2]).toBe(false);
    }
  });
});

describe('Post job', () => {
  test('NODE_ENV value should be reset', () => expect(process.env.NODE_ENV).toBe(NODE_ENV));
});
