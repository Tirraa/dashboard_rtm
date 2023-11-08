import InvalidArgumentsError from '@/errors/exceptions/InvalidArgument';

type Lower = number;
type Upper = number;

export const getBounds = (n1: number, n2: number): [Lower, Upper] => [n1 < n2 ? n1 : n2, n1 > n2 ? n1 : n2];

/**
 * @throws {InvalidArgumentsError}
 */
export function isInOpenInterval(n: number, endpoint1: number, endpoint2: number) {
  if (endpoint1 === endpoint2)
    throw new InvalidArgumentsError(isInOpenInterval.name, { endpoint1, endpoint2 }, "endpoint1 and endpoint2 shouldn't be equal");

  const [lower, upper] = getBounds(endpoint1, endpoint2);
  return lower < n && n < upper;
}

export function isInCloseInterval(n: number, endpoint1: number, endpoint2: number) {
  if (endpoint1 === endpoint2) return n === endpoint1;

  const [min, max] = getBounds(endpoint1, endpoint2);
  return min <= n && n <= max;
}
