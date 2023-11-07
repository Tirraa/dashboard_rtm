import type { FunctionComponent } from 'react';

interface CrumbSeparatorProps {}

const CrumbSeparator: FunctionComponent<CrumbSeparatorProps> = () => (
  <span className="mx-1 select-none" aria-hidden="true">
    /
  </span>
);

export default CrumbSeparator;
