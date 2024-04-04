'use client';

import type { FiltersAssoc } from '@/config/Blog/client';
import type { Id } from '@rtm/shared-types/Numbers';
import type { FunctionComponent } from 'react';

import { SelectContent, SelectTrigger, SelectGroup, SelectValue, SelectItem, Select } from '@/components/ui/Select';
import { MAX_FILTER_INDEX } from '@/config/Blog/client';
import { useEffect, useState, useMemo } from 'react';
import { getClientSideI18n } from '@/i18n/client';
import { useSearchParams } from 'next/navigation';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';

import { getSanitizedCurrentFilterIndex } from './helpers/functions/filtersSelectWidget';
import { FILTERS_KEY } from './helpers/constants';

export interface FiltersSelectWidgetProps {
  setSelectedFilterSwitch: (s: boolean) => unknown;
  setSelectedFilter: (filter: Id) => unknown;
  filtersAssoc: FiltersAssoc;
  triggerClassName?: string;
  selectedFilter: Id;
}

const FiltersSelectWidget: FunctionComponent<FiltersSelectWidgetProps> = ({
  setSelectedFilterSwitch,
  setSelectedFilter,
  triggerClassName,
  selectedFilter,
  filtersAssoc
}) => {
  const globalT = getClientSideI18n();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState<boolean>(false);
  const onOpenChange = (opened: boolean) => setOpen(opened);

  const buildSelectItems = () =>
    filtersAssoc.map((config, index) => (
      <SelectItem key={`select-item-${index}`} value={String(index)}>
        {globalT(config.i18nTitle)}
      </SelectItem>
    ));

  const sanitizedFilter = useMemo(() => getSanitizedCurrentFilterIndex(searchParams, MAX_FILTER_INDEX, FILTERS_KEY), [searchParams]);

  useEffect(() => {
    setSelectedFilter(sanitizedFilter);
  }, [sanitizedFilter, setSelectedFilter]);

  return (
    <Select
      onValueChange={(value: string) => {
        const f = Number(value);
        if (f !== selectedFilter) setSelectedFilterSwitch(true);
        setSelectedFilter(f);
      }}
      onOpenChange={(isOpen: boolean) => onOpenChange(isOpen)}
      value={String(sanitizedFilter)}
    >
      <SelectTrigger
        chevronClassName={cn('transition-transform', {
          'ltr:-rotate-180 rtl:rotate-180': open
        })}
        className={cn('mx-[2px] min-w-[124px] lg:min-w-[176px]', triggerClassName)}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup aria-label={globalT(`${i18ns.srOnly}.sort-by`)}>{buildSelectItems()}</SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FiltersSelectWidget;
