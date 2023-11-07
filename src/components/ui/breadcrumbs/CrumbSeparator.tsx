import type { FunctionComponent } from 'react';

interface CrumbSeparatorProps {}

const CrumbSeparator: FunctionComponent<CrumbSeparatorProps> = () => (
  <span className="mx-1 select-none text-black text-opacity-50 dark:text-white" aria-hidden="true">
    /
  </span>
);

export default CrumbSeparator;
