import InvalidArgumentsError from '@/errors/exceptions/InvalidArgument';
import { isInCloseInterval } from '@/lib/number';
import Color from 'color';

interface RGBAColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * @throws {InvalidArgumentsError}
 */
export function RGBAColor({ r, g, b, a: x }: RGBAColor) {
  if (!isInCloseInterval(x, 0, 1)) throw new InvalidArgumentsError(RGBAColor.name, { x });
  return Color({ r, g, b }).fade(1 - x);
}
