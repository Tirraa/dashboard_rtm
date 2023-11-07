import { DATA_QA_WARNING_DOM_KEY, QA_WARNINGS } from '@/types/QA';
import Link from 'next/link';
import type { FunctionComponent } from 'react';
import CrumbSeparator from './CrumbSeparator';

interface CrumbProps {
  label: string;
  isLeaf?: boolean;
  withRescueCtx?: boolean;
  href?: string;
}

const Crumb: FunctionComponent<CrumbProps> = ({ label, href: maybeHref, isLeaf: maybeIsLeaf, withRescueCtx: maybeWithRescueCtx }) => {
  const QA_WARNING = maybeWithRescueCtx ? QA_WARNINGS.IS_A_FALLBACK : undefined;
  const isLeaf = Boolean(maybeIsLeaf);
  const p = { 'aria-hidden': isLeaf, [DATA_QA_WARNING_DOM_KEY]: QA_WARNING };

  if (maybeHref) {
    return (
      <>
        <Link href={maybeHref} {...p}>
          {label}
        </Link>
        {!isLeaf && <CrumbSeparator />}
      </>
    );
  }

  return (
    <span {...p}>
      {label}
      {!isLeaf && <CrumbSeparator />}
    </span>
  );
};

export default Crumb;
