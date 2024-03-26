import { useEffect, useState } from 'react';

const computePagesAmount = (total: number, perChunk: number) => Math.ceil(total / perChunk);

const usePagination = <T>(items: T[], itemsPerPage: number): number => {
  const [pagesAmount, setPagesAmount] = useState<number>(computePagesAmount(items.length, itemsPerPage));

  useEffect(() => {
    const freshPagesAmount = computePagesAmount(items.length, itemsPerPage);
    setPagesAmount(freshPagesAmount);
  }, [items, itemsPerPage]);

  return pagesAmount;
};

export default usePagination;
