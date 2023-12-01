import { DATA_QA_WARNING_DOM_KEY, QA_WARNINGS } from '##/config/QA';
import { cn } from '@/lib/tailwind';
import type { MaybeObjectValue } from '@rtm/shared-types/CustomUtilityTypes';
import Link from 'next/link';
import type { FunctionComponent } from 'react';
import CrumbSeparator from './CrumbSeparator';

interface CrumbProps {
  label: string;
  href: string;
  isLeaf?: boolean;
  withRescueCtx?: boolean;
}

const Crumb: FunctionComponent<CrumbProps> = ({ label, href, isLeaf: maybeIsLeaf, withRescueCtx: maybeWithRescueCtx }) => {
  const QA_WARNING: MaybeObjectValue<string> = maybeWithRescueCtx ? QA_WARNINGS.IS_A_FALLBACK : undefined;
  const QA_PROPS = { [DATA_QA_WARNING_DOM_KEY]: QA_WARNING };
  const isLeaf = Boolean(maybeIsLeaf);

  return (
    <>
      <Link
        {...QA_PROPS}
        href={href}
        aria-current={isLeaf ? 'page' : undefined}
        aria-disabled={isLeaf ? 'true' : undefined}
        className={cn(
          'duration-250 transition-colors',
          {
            'opacity-60 hover:text-primary hover:opacity-100 focus:text-primary focus:opacity-100': !isLeaf
          },
          { 'pointer-events-none font-semibold': isLeaf }
        )}
      >
        {label}
      </Link>
      {!isLeaf && <CrumbSeparator />}
    </>
  );
};

export default Crumb;
