import type { WithClassname, AppPath } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import { hrefAndPathnameExactMatch } from '@/lib/str';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

interface ResultProps extends Partial<WithClassname> {
  metaTitle: string;
  excerpt: string;
  href: AppPath;
}

const Result: FunctionComponent<ResultProps> = ({ className, metaTitle, excerpt, href }) => {
  const currentPathname = usePathname();
  const exactMatch = hrefAndPathnameExactMatch(href, currentPathname);

  return (
    <Link
      className={cn(
        'w-full',
        {
          'pointer-events-none opacity-50': exactMatch
        },
        className
      )}
      aria-current={exactMatch ? 'page' : undefined}
      href={href}
    >
      <h3>{metaTitle}</h3>
      <p dangerouslySetInnerHTML={{ __html: excerpt }} />
    </Link>
  );
};

export default Result;
