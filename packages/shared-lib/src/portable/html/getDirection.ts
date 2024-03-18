/* v8 ignore start */
// Stryker disable all

import type { Direction } from '@rtm/shared-types/HTML';

// {ToDo} Refactor 'getDirection' to make it a React hook like scrollDirection?
const getDirection = () => window.getComputedStyle(document.documentElement).direction as Direction;
export default getDirection;

// Stryker restore all
/* v8 ignore stop */
