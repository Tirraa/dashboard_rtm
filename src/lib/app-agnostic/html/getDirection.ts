import type { Direction } from '@/types/HTML';

export const getDirection = () => window.getComputedStyle(document.documentElement).direction as Direction;
export default getDirection;
