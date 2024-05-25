import type { FunctionComponent } from 'react';

import cn from '@/lib/portable/tailwind/cn';
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
        className={cn('duration-250 transition-opacity', {
          'opacity-60 hover:opacity-100 focus:opacity-100': !isLeaf,
          'pointer-events-none font-semibold': isLeaf
        })}
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
