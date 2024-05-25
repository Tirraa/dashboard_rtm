'use client';

import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { FunctionComponent, MutableRefObject } from 'react';
import type { FiltersAssoc } from '@/config/Blog/client';
import type { Id } from '@rtm/shared-types/Numbers';

import { SelectContent, SelectTrigger, SelectGroup, SelectValue, SelectItem, Select } from '@/components/ui/Select';
import { getClientSideI18n } from '@/i18n/client';
import cn from '@/lib/portable/tailwind/cn';
import { useState, useMemo } from 'react';
import { i18ns } from '##/config/i18n';

export interface FiltersSelectWidgetProps {
  newSelectedFilter: MutableRefObject<MaybeNull<Id>>;
  setSelectedFilterSwitch: (s: boolean) => unknown;
  selectContentClassName?: string;
  filtersAssoc: FiltersAssoc;
  triggerClassName?: string;
  selectedFilter: Id;
}

const FiltersSelectWidget: FunctionComponent<FiltersSelectWidgetProps> = ({
  setSelectedFilterSwitch,
  selectContentClassName,
  newSelectedFilter,
  triggerClassName,
  selectedFilter,
  filtersAssoc
}) => {
  const globalT = getClientSideI18n();

  const [opened, setOpened] = useState<boolean>(false);
  const onOpenChange = (opened: boolean) => setOpened(opened);

  const selectItems = useMemo(
    () =>
      filtersAssoc.map((config, index) => (
        <SelectItem
          className={cn('max-lg:h-12', {
            'hover:bg-accent active:pointer-events-none max-lg:pointer-events-none': index === selectedFilter
          })}
          key={`select-item-${index}`}
          value={String(index)}
        >
          {globalT(config.i18nTitle)}
        </SelectItem>
      )),
    [filtersAssoc, globalT, selectedFilter]
  );

  return (
    <Select
      onValueChange={(value: string) => {
        const filter = Number(value);

        if (filter === selectedFilter) {
          newSelectedFilter.current = null;
        } else {
          newSelectedFilter.current = filter;
          setSelectedFilterSwitch(true);
        }
      }}
      onOpenChange={(isOpened: boolean) => onOpenChange(isOpened)}
      value={String(selectedFilter)}
      open={opened}
    >
      <SelectTrigger
        chevronClassName={cn('transition-transform', {
          'ltr:-rotate-180 rtl:rotate-180': opened
        })}
        className={cn('mx-[2px] min-w-[124px] lg:min-w-[176px]', triggerClassName)}
        aria-label={globalT(`${i18ns.filters}.select-a-filter`)}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className={selectContentClassName}>
        <SelectGroup aria-label={globalT(`${i18ns.srOnly}.sort-by`)}>{selectItems}</SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FiltersSelectWidget;
