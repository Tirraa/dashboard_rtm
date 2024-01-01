import type { MaybeObjectValue } from '@rtm/shared-types/CustomUtilityTypes';
import type { FunctionComponent } from 'react';

import { DATA_QA_WARNING_DOM_KEY, QA_WARNINGS } from '##/config/QA';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

import CrumbSeparator from './CrumbSeparator';

interface CrumbProps {
  withRescueCtx?: boolean;
  isLeaf?: boolean;
  label: string;
  href: string;
}

const Crumb: FunctionComponent<CrumbProps> = ({ withRescueCtx: maybeWithRescueCtx, isLeaf: maybeIsLeaf, label, href }) => {
  // {ToDo} Invalidate build when Rescue CTX with a console.warn
  const QA_WARNING: MaybeObjectValue<string> = maybeWithRescueCtx ? QA_WARNINGS.IS_A_FALLBACK : undefined;
  const QA_PROPS = { [DATA_QA_WARNING_DOM_KEY]: QA_WARNING };
  const isLeaf = Boolean(maybeIsLeaf);

  return (
    <>
      <Link
        {...QA_PROPS}
        className={cn(
          'duration-250 transition-colors',
          {
            'opacity-60 hover:text-primary hover:opacity-100 focus:text-primary focus:opacity-100': !isLeaf
          },
          { 'pointer-events-none font-semibold': isLeaf }
        )}
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
