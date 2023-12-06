import NODE_ENV from '𝕋/setEnvVars';
import type { ComputedNodeCtx } from '../env';

const getCtx = () => require('../env').default as typeof ComputedNodeCtx;

describe('ComputedNodeCtx', () => {
  beforeEach(() => {
    jest.resetModules();
    // @ts-expect-error
    process.env.NODE_ENV = NODE_ENV;
  });

  // @ts-expect-error
  afterAll(() => (process.env.NODE_ENV = NODE_ENV));

  it('should have all values to false, except TEST', () => {
    const ctx = getCtx();

    Object.keys(ctx).forEach((k) => {
      const k2 = k as keyof typeof ctx;
      if (k2 === 'TEST') expect(ctx[k2]).toBe(true);
      else expect(ctx[k2]).toBe(false);
    });
  });

  it('should have all values to false, except DEV', () => {
    // @ts-expect-error
    process.env.NODE_ENV = 'dev';
    const ctx = getCtx();

    Object.keys(ctx).forEach((k) => {
      const k2 = k as keyof typeof ctx;
      if (k2 === 'DEV') expect(ctx[k2]).toBe(true);
      else expect(ctx[k2]).toBe(false);
    });
  });

  it('should have all values to false, except PROD', () => {
    // @ts-expect-error
    process.env.NODE_ENV = 'prod';
    const ctx = getCtx();

    Object.keys(ctx).forEach((k) => {
      const k2 = k as keyof typeof ctx;
      if (k2 === 'PROD') expect(ctx[k2]).toBe(true);
      else expect(ctx[k2]).toBe(false);
    });
  });

  describe('Fallbacks', () => {
    beforeEach(() => jest.spyOn(console, 'warn').mockImplementation(jest.fn()));

    it('should fallback on PROD, given an unknown NODE_ENV value', () => {
      // @ts-expect-error
      process.env.NODE_ENV = '$';
      const ctx = getCtx();

      Object.keys(ctx).forEach((k) => {
        const k2 = k as keyof typeof ctx;
        if (k2 === 'PROD') expect(ctx[k2]).toBe(true);
        else expect(ctx[k2]).toBe(false);
      });
    });

    it('should fallback on PROD, given an undefined NODE_ENV value', () => {
      // @ts-expect-error
      process.env.NODE_ENV = undefined;
      const ctx = getCtx();

      Object.keys(ctx).forEach((k) => {
        const k2 = k as keyof typeof ctx;
        if (k2 === 'PROD') expect(ctx[k2]).toBe(true);
        else expect(ctx[k2]).toBe(false);
      });
    });
  });

  it('should be reset', () => expect(process.env.NODE_ENV).toBe(NODE_ENV));
});
