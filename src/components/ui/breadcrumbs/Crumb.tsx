import Link from 'next/link';
import type { FunctionComponent } from 'react';
import CrumbSeparator from './CrumbSeparator';

interface CrumbProps {
  label: string;
  isLeaf?: boolean;
  href?: string;
}

const Crumb: FunctionComponent<CrumbProps> = ({ label, href: maybeHref, isLeaf: maybeIsLeaf }) => {
  const isLeaf = Boolean(maybeIsLeaf);

  if (maybeHref) {
    return (
      <>
        <Link href={maybeHref}>{label}</Link>
        {!isLeaf && <CrumbSeparator />}
      </>
    );
  }

  return (
    <span>
      {label}
      {!isLeaf && <CrumbSeparator />}
    </span>
  );
};

export default Crumb;
