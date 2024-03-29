import type { Quantity, Limit } from '@rtm/shared-types/Numbers';

import { useEffect, useState } from 'react';

import { computePagesAmount } from './helpers/usePagination/functions';

const usePagination = <T>(items: T[], itemsPerPage: Limit): Quantity => {
  const [pagesAmount, setPagesAmount] = useState<Quantity>(computePagesAmount(items.length, itemsPerPage));

  useEffect(() => {
    const freshPagesAmount = computePagesAmount(items.length, itemsPerPage);
    setPagesAmount(freshPagesAmount);
  }, [items, itemsPerPage]);

  return pagesAmount;
};

export default usePagination;
