import type { Direction } from '@rtm/shared-types/HTML';

const getDirection = () => window.getComputedStyle(document.documentElement).direction as Direction;
export default getDirection;
