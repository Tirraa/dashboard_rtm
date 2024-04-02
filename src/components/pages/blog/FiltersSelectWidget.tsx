'use client';

import type { FunctionComponent } from 'react';

import { SelectContent, SelectTrigger, SelectGroup, SelectValue, SelectItem, Select } from '@/components/ui/Select';
import BlogConfigClient from '@/config/Blog/client';
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

  const buildSelectItems = () =>
    BlogConfigClient.COMPARE_FUNCTIONS_USED_TO_SORT_POSTS_ON_BLOG_SUBCATEGORY_PAGE.map((config, index) => (
      <SelectItem key={`select-item-${index}`} value={String(index)}>
        {globalT(config.i18nTitle)}
      </SelectItem>
    ));

  return (
    <Select onOpenChange={(isOpen: boolean) => onOpenChange(isOpen)} defaultValue="0">
      <SelectTrigger
        chevronClassName={cn('transition-transform', {
          'ltr:-rotate-180 rtl:rotate-180': open
        })}
        className={cn('mx-[2px] min-w-[182px] ', triggerClassName)}
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
