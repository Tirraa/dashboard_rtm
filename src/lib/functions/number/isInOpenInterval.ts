import InvalidArgumentsError from '../../../errors/exceptions/InvalidArgument';
import getBounds from './getBounds';

/**
 * @throws {InvalidArgumentsError}
 */
export function isInOpenInterval(n: number, endpoint1: number, endpoint2: number) {
  if (endpoint1 === endpoint2)
    throw new InvalidArgumentsError(isInOpenInterval.name, { endpoint1, endpoint2 }, "endpoint1 and endpoint2 shouldn't be equal");

  const [lower, upper] = getBounds(endpoint1, endpoint2);
  return lower < n && n < upper;
}

export default isInOpenInterval;
