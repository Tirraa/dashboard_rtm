'use client';

import type { WithClassname } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import capitalize from '@/lib/portable/str/capitalize';
import { useScopedI18n } from '@/i18n/client';
import cn from '@/lib/portable/tailwind/cn';
import { i18ns } from '##/config/i18n';

import { Badge } from '../Badge';

interface DraftBadgeProps extends Partial<WithClassname> {}

const DraftBadge: FunctionComponent<DraftBadgeProps> = ({ className: classNameValue }) => {
  const scopedT = useScopedI18n(i18ns.vocab);
  const className = classNameValue ?? '';

  return (
    <Badge
      className={cn(
        'h-fit w-fit select-none border border-[#e5e7eb] bg-transparent text-sm  font-bold text-black hover:bg-transparent dark:border-white dark:text-white',
        className
      )}
    >
      {capitalize(scopedT('draft'))}
    </Badge>
  );
};

export default DraftBadge;
