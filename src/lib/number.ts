import InvalidArgumentsError from '@/errors/exceptions/InvalidArgument';

export const getBounds = (n1: number, n2: number): [number, number] => [n1 < n2 ? n1 : n2, n1 > n2 ? n1 : n2];

/**
 * @throws {InvalidArgumentsError}
 */
export function isInOpenInterval(x: number, endpoint1: number, endpoint2: number) {
  if (endpoint1 === endpoint2) throw new InvalidArgumentsError(isInOpenInterval.name, { endpoint1, endpoint2 });

  const [lower, upper] = getBounds(endpoint1, endpoint2);
  return lower < x && x < upper;
}

export function isInCloseInterval(x: number, endpoint1: number, endpoint2: number) {
  if (endpoint1 === endpoint2) return x === endpoint1;

  const [min, max] = getBounds(endpoint1, endpoint2);
  return min <= x && x <= max;
}
