import ComputedNodeCtx from '../env';

it('should handle NODE_ENV correctly', () => {
  Object.keys(ComputedNodeCtx).forEach((k) => {
    const k2 = k as keyof typeof ComputedNodeCtx;
    console.log(k2);
    console.log(ComputedNodeCtx[k2]);
    if (k2 === 'TEST') expect(ComputedNodeCtx[k2]).toBe(true);
    else expect(ComputedNodeCtx[k2]).toBe(false);
  });
});
