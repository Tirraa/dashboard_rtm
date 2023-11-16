import getBounds from './getBounds';

export function isInCloseInterval(n: number, endpoint1: number, endpoint2: number) {
  if (endpoint1 === endpoint2) return n === endpoint1;

  const [min, max] = getBounds(endpoint1, endpoint2);
  return min <= n && n <= max;
}

export default isInCloseInterval;
