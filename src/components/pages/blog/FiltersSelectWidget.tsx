'use client';

import type { FunctionComponent } from 'react';

import { SelectContent, SelectTrigger, SelectGroup, SelectValue, SelectItem, Select } from '@/components/ui/Select';
import { getClientSideI18n } from '@/i18n/client';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';
import { useState } from 'react';

interface FiltersSelectWidgetProps {
  triggerClassName?: string;
}

const FiltersSelectWidget: FunctionComponent<FiltersSelectWidgetProps> = ({ triggerClassName }) => {
  const globalT = getClientSideI18n();
  const [open, setOpen] = useState<boolean>(false);
  const onOpenChange = (opened: boolean) => setOpen(opened);

  return (
    <Select onOpenChange={(isOpen: boolean) => onOpenChange(isOpen)} defaultValue="date-asc">
      <SelectTrigger
        chevronClassName={cn('transition-transform', {
          'ltr:-rotate-180 rtl:rotate-180': open
        })}
        className={cn('mx-[2px] min-w-[182px] ', triggerClassName)}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup aria-label={globalT(`${i18ns.srOnly}.sort-by`)}>
          <SelectItem value="date-asc">{globalT(`${i18ns.filters}.date-asc`)}</SelectItem>
          <SelectItem value="date-desc">{globalT(`${i18ns.filters}.date-desc`)}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FiltersSelectWidget;
