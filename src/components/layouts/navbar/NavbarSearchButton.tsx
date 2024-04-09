'use client';

import type { FunctionComponent, ChangeEvent } from 'react';

import { DialogContent, DialogTrigger, DialogHeader, Dialog } from '@/components/ui/Dialog';
import { TabsContent, TabsTrigger, TabsList, Tabs } from '@/components/ui/Tabs';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { getClientSideI18n } from '@/i18n/client';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { i18ns } from '##/config/i18n';
import { capitalize } from '@/lib/str';
import { useState } from 'react';
import debounce from 'debounce';

interface NavbarSearchButtonProps {}

const NavbarSearchButton: FunctionComponent<NavbarSearchButtonProps> = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [value, setValue] = useState<Value>('all');

  const globalT = getClientSideI18n();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const debouncedOnChange = debounce(onChange, 200);

  return (
    <Dialog>
      <DialogTrigger aria-label={globalT(`${i18ns.navbar}.sr-only.open-search-menu`)} className="h-full w-4">
        <MagnifyingGlassIcon />
      </DialogTrigger>
      <DialogContent className="h-full max-h-[90vh] max-w-[90vw]">
        <DialogHeader>
          <Tabs onValueChange={(v) => setValue(v as Value)} className="w-full px-5" value={value}>
            <TabsList className="mx-auto grid w-full grid-cols-3">
              <TabsTrigger className="hover:bg-primary hover:font-bold hover:text-white focus:font-semibold" value={'all' satisfies Value}>
                {capitalize(globalT(`${i18ns.vocab}.all`))}
              </TabsTrigger>
              <TabsTrigger className="hover:bg-primary hover:font-bold hover:text-white focus:font-semibold" value={'pages' satisfies Value}>
                {capitalize(globalT(`${i18ns.vocab}.pages`))}
              </TabsTrigger>
              <TabsTrigger className="hover:bg-primary hover:font-bold hover:text-white focus:font-semibold" value={'blog' satisfies Value}>
                {capitalize(globalT(`${i18ns.vocab}.blog`))}
              </TabsTrigger>
            </TabsList>
            <div className="mt-5 grid w-full items-center gap-1.5">
              <Label htmlFor="modal-search">{capitalize(globalT(`${i18ns.vocab}.${value}`))}</Label>
              <Input
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  debouncedOnChange(event);
                }}
                placeholder={`${capitalize(globalT(`${i18ns.vocab}.search`))}...`}
                id="modal-search"
                className="mt-1"
                type="text"
              />
            </div>
            <TabsContent value="all">{searchText}</TabsContent>
            <TabsContent value="pages">{searchText}</TabsContent>
            <TabsContent value="blog">{searchText}</TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NavbarSearchButton;

type Value = 'pages' | 'blog' | 'all';
