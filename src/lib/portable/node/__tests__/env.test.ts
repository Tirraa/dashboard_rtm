import { afterAll, beforeEach, describe, expect, it, test, vi } from 'vitest';
import NODE_ENV from 'Ț/setEnv';
import type ComputedNodeCtx from '../env';

const getCtx = async () => (await import('../env')).default as typeof ComputedNodeCtx;

describe('ComputedNodeCtx', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    vi.resetModules();
    vi.spyOn(console, 'warn').mockImplementationOnce(vi.fn(() => {}));

    // * ... Workaround: if we only reassign process.env.NODE_ENV, the coverage decreases
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should have all values to false, except TEST', async () => {
    const ctx = await getCtx();

    Object.keys(ctx).forEach((k) => {
      const k2 = k as keyof typeof ctx;
      if (k2 === 'TEST') expect(ctx[k2]).toBe(true);
      else expect(ctx[k2]).toBe(false);
    });
  });

  it('should have all values to false, except DEV', async () => {
    // @ts-expect-error
    process.env.NODE_ENV = 'dev';
    const ctx = await getCtx();

    Object.keys(ctx).forEach((k) => {
      const k2 = k as keyof typeof ctx;
      if (k2 === 'DEV') expect(ctx[k2]).toBe(true);
      else expect(ctx[k2]).toBe(false);
    });
  });

  it('should have all values to false, except PROD', async () => {
    // @ts-expect-error
    process.env.NODE_ENV = 'prod';
    const ctx = await getCtx();

    Object.keys(ctx).forEach((k) => {
      const k2 = k as keyof typeof ctx;
      if (k2 === 'PROD') expect(ctx[k2]).toBe(true);
      else expect(ctx[k2]).toBe(false);
    });
  });

  it('should fallback on PROD, given an unknown NODE_ENV value', async () => {
    // @ts-expect-error
    process.env.NODE_ENV = '$';
    const ctx = await getCtx();

    Object.keys(ctx).forEach((k) => {
      const k2 = k as keyof typeof ctx;
      if (k2 === 'PROD') expect(ctx[k2]).toBe(true);
      else expect(ctx[k2]).toBe(false);
    });
  });

  it('should fallback on PROD, given an undefined NODE_ENV value', async () => {
    // @ts-expect-error
    process.env.NODE_ENV = undefined;
    const ctx = await getCtx();

    Object.keys(ctx).forEach((k) => {
      const k2 = k as keyof typeof ctx;
      if (k2 === 'PROD') expect(ctx[k2]).toBe(true);
      else expect(ctx[k2]).toBe(false);
    });
  });

  test('NODE_ENV value should be reset', () => expect(process.env.NODE_ENV).toBe(NODE_ENV));
});
