/* v8 ignore start */
// Stryker disable all

import type { Direction } from '@rtm/shared-types/HTML';

// {ToDo} Craft a Direction Provider instead of this stupid getDirection function https://www.radix-ui.com/primitives/docs/utilities/direction-provider
// See also: https://github.com/QuiiBz/next-international/issues/393
const getDirection = () => window.getComputedStyle(document.documentElement).direction as Direction;
export default getDirection;

// Stryker restore all
/* v8 ignore stop */
