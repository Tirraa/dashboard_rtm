import type { Direction } from '@rtm/shared-types/src/HTML';

export const getDirection = () => window.getComputedStyle(document.documentElement).direction as Direction;
export default getDirection;
