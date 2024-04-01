import type { WithClassname } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import { SelectContent, SelectTrigger, SelectGroup, SelectLabel, SelectValue, SelectItem, Select } from '@/components/ui/Select';
import { cn } from '@/lib/tailwind';

interface FiltersSelectWidgetProps extends Partial<WithClassname> {}

const FiltersSelectWidget: FunctionComponent<FiltersSelectWidgetProps> = ({ className }) => (
  <Select>
    <SelectTrigger className={cn('w-[180px]', className)}>
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default FiltersSelectWidget;
