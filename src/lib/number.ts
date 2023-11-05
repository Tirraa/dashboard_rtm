import InvalidArgumentsError from '@/errors/exceptions/InvalidArgument';
import type { LineSegment, Point } from '@/types/Math';

export const getBounds = (n1: number, n2: number): [number, number] => [n1 < n2 ? n1 : n2, n1 > n2 ? n1 : n2];

/**
 * @throws {InvalidArgumentsError}
 */
export function isInOpenInterval(x: number, endpoint1: number, endpoint2: number) {
  if (endpoint1 === endpoint2)
    throw new InvalidArgumentsError(isInOpenInterval.name, { endpoint1, endpoint2 }, "endpoint1 and endpoint2 shouldn't be equal");

  const [lower, upper] = getBounds(endpoint1, endpoint2);
  return lower < x && x < upper;
}

export function isInCloseInterval(x: number, endpoint1: number, endpoint2: number) {
  if (endpoint1 === endpoint2) return x === endpoint1;

  const [min, max] = getBounds(endpoint1, endpoint2);
  return min <= x && x <= max;
}

/**
 * @throws {InvalidArgumentsError}
 */
export function arePointsEqual(p1: Point, p2: Point, deadZone: number = 0) {
  if (deadZone < 0) throw new InvalidArgumentsError(arePointsEqual.name, { deadZone }, 'deadZone must be a positive number');
  if (deadZone === 0) return p1.x === p2.x && p1.y === p2.y;

  const xDistance = Math.abs(p1.x - p2.x);
  const yDistance = Math.abs(p1.y - p2.y);
  return xDistance <= deadZone && yDistance <= deadZone;
}

export function isInRect(diagonalFromTopLeftCornerToBottomRightCorner: LineSegment, point: Point) {
  const [P, D] = [point, diagonalFromTopLeftCornerToBottomRightCorner];

  return isInOpenInterval(P.x, D.start.x, D.end.x) && isInOpenInterval(P.y, D.start.y, D.end.y);
}
