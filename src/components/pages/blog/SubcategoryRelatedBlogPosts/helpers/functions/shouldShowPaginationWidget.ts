import type { Quantity } from '@rtm/shared-types/Numbers';

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const shouldShowPaginationWidget = (pagesAmount: Quantity): boolean => pagesAmount > 1;

export default shouldShowPaginationWidget;
