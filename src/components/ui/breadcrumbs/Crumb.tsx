import type { FunctionComponent } from 'react';

import Link from 'next/link';

import CrumbSeparator from './CrumbSeparator';

interface CrumbProps {
  withRescueCtx?: boolean;
  isLeaf?: boolean;
  label: string;
  href: string;
}

const Crumb: FunctionComponent<CrumbProps> = ({ isLeaf: maybeIsLeaf, label, href }) => {
  const isLeaf = Boolean(maybeIsLeaf);

  return (
    <>
      <Link
        className={`duration-250 transition-colors ${
          !isLeaf ? 'opacity-60 hover:text-primary hover:opacity-100 focus:text-primary focus:opacity-100' : ''
        } ${isLeaf ? 'pointer-events-none font-semibold' : ''}`}
        aria-disabled={isLeaf ? 'true' : undefined}
        aria-current={isLeaf ? 'page' : undefined}
        href={href}
      >
        {label}
      </Link>
      {!isLeaf && <CrumbSeparator />}
    </>
  );
};

export default Crumb;
