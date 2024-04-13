import type { WithClassname, AppPath } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import { hrefAndPathnameExactMatch } from '@/lib/str';
import { usePathname } from 'next/navigation';
import { Link } from 'lucide-react';
import { cn } from '@/lib/tailwind';

// {ToDo} Type this
type PagefindResult = any;

interface ResultProps extends Partial<WithClassname> {
  result: PagefindResult;
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
        {
          'pointer-events-none opacity-50': exactMatch
        },
        className
      )}
      aria-current={exactMatch ? 'page' : undefined}
      href={href}
    >
      <h3>{metaTitle}</h3>
      <p>{excerpt}</p>
    </Link>
  );
};

export default Result;
