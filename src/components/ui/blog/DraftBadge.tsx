import type { WithClassname } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import { getScopedI18n } from '@/i18n/server';
import { capitalize } from '@/lib/str';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';

import { Badge } from '../Badge';

interface DraftBadgeProps extends Partial<WithClassname> {}

const DraftBadge: FunctionComponent<DraftBadgeProps> = async ({ className: classNameValue }) => {
  const scopedT = await getScopedI18n(i18ns.vocab);
  const className = classNameValue ?? '';

  return (
    <Badge
      className={cn(
        'h-fit w-fit select-none border-[1px] border-[#e5e7eb] bg-transparent text-sm  font-bold text-black hover:bg-transparent dark:border-white dark:text-white',
        className
      )}
    >
      {capitalize(scopedT('draft'))}
    </Badge>
  );
};

export default DraftBadge;
