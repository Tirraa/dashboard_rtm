/* v8 ignore start */
// Stryker disable all

import type { Direction } from '@rtm/shared-types/HTML';

// {ToDo} Craft a Direction Provider instead of this stupid getDirection function https://www.radix-ui.com/primitives/docs/utilities/direction-provider
const getDirection = () => window.getComputedStyle(document.documentElement).direction as Direction;
export default getDirection;

// Stryker restore all
/* v8 ignore stop */
