/* v8 ignore start */
// Stryker disable all
import type { Direction } from '@rtm/shared-types/HTML';

const getDirection = () => window.getComputedStyle(document.documentElement).direction as Direction;
export default getDirection;
/* v8 ignore stop */
// Stryker restore all
