import type { Quantity, Limit } from '@rtm/shared-types/Numbers';

export const computePagesAmount = (total: Quantity, perChunk: Limit) => Math.ceil(total / perChunk);
