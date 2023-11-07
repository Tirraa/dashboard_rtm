import type { FunctionComponent } from 'react';

interface CrumbSeparatorProps {}

const CrumbSeparator: FunctionComponent<CrumbSeparatorProps> = () => (
  <span className="m-1" aria-hidden="true">
    /
  </span>
);

export default CrumbSeparator;
