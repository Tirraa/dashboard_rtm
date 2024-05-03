import type { WithClassname, AppPath } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import { hrefAndPathnameExactMatch } from '@/lib/str';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

import { CardContent, CardHeader, CardTitle, Card } from '../Card';

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
        'search-menu-result-link',
        'flex h-fit w-full flex-col transition-transform duration-300 hover:delay-0 hover:duration-100 focus:delay-0 focus:duration-100 dark:hover:brightness-125 dark:focus:brightness-125',
        {
          'pointer-events-none opacity-50': exactMatch
        },
        className
      )}
      aria-current={exactMatch ? 'page' : undefined}
      href={href}
    >
      <Card className="h-fit overflow-hidden rounded shadow-lg transition-[box-shadow] duration-300 hover:shadow-xl focus:shadow-xl">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between" titleType="h3">
            {metaTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p dangerouslySetInnerHTML={{ __html: excerpt }} />
        </CardContent>
      </Card>
    </Link>
  );
};

export default Result;
