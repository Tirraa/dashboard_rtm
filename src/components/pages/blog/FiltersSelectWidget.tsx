'use client';

import type { Id } from '@rtm/shared-types/Numbers';
import type { FunctionComponent } from 'react';

import { SelectContent, SelectTrigger, SelectGroup, SelectValue, SelectItem, Select } from '@/components/ui/Select';
import { getSanitizedCurrentFilterIndex } from '@/components/ui/helpers/PaginatedElements/functions';
import BlogConfigClient, { MAX_FILTER_INDEX } from '@/config/Blog/client';
import { getClientSideI18n } from '@/i18n/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { i18ns } from '##/config/i18n';
import { cn } from '@/lib/tailwind';

import { FILTERS_KEY } from './helpers/constants';

export interface FiltersSelectWidgetProps {
  setSelectedFilter: (filter: Id) => unknown;
  triggerClassName?: string;
  selectedFilter: Id;
}

const FiltersSelectWidget: FunctionComponent<FiltersSelectWidgetProps> = ({ setSelectedFilter, triggerClassName, selectedFilter }) => {
  const globalT = getClientSideI18n();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState<boolean>(false);
  const onOpenChange = (opened: boolean) => setOpen(opened);

  const buildSelectItems = () =>
    BlogConfigClient.COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE.map((config, index) => (
      <SelectItem key={`select-item-${index}`} value={String(index)}>
        {globalT(config.i18nTitle)}
      </SelectItem>
    ));

  useEffect(() => {
    const sanitizedFilter = getSanitizedCurrentFilterIndex(searchParams, MAX_FILTER_INDEX, FILTERS_KEY);
    setSelectedFilter(sanitizedFilter);
  }, [searchParams, setSelectedFilter]);

  return (
    <Select
      onValueChange={(value: string) => setSelectedFilter(Number(value))}
      onOpenChange={(isOpen: boolean) => onOpenChange(isOpen)}
      value={String(selectedFilter)}
    >
      <SelectTrigger
        chevronClassName={cn('transition-transform', {
          'ltr:-rotate-180 rtl:rotate-180': open
        })}
        className={cn('mx-[2px] min-w-[182px]', triggerClassName)}
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
