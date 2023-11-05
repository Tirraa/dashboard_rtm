import InvalidArgumentsError from '@/errors/exceptions/InvalidArgument';
import { isInCloseInterval } from '@/lib/number';
import Color from 'color';

type RGBAValues = 'r' | 'g' | 'b' | 'a';
type RGBAColor = Record<RGBAValues, number>;

/**
 * @throws {InvalidArgumentsError}
 */
export function RGBAColor({ r, g, b, a }: RGBAColor) {
  if (!isInCloseInterval(a, 0, 1)) throw new InvalidArgumentsError(RGBAColor.name, { a }, 'a must be between 0 and 1');

  return Color({ r, g, b }).fade(1 - a);
}
