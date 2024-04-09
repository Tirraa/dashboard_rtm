'use client';

import type { ChangeEventHandler, FunctionComponent } from 'react';

import { DialogContent, DialogTrigger, DialogHeader, Dialog } from '@/components/ui/Dialog';
import { TabsContent, TabsTrigger, TabsList, Tabs } from '@/components/ui/Tabs';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { getClientSideI18n } from '@/i18n/client';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useDebounce } from 'use-debounce';
import { useState, useRef } from 'react';
import { i18ns } from '##/config/i18n';
import { capitalize } from '@/lib/str';

interface NavbarSearchButtonProps {}

const VALUE_INITIAL_STATE: TabValue = 'all';
const SEARCH_TEXT_INITIAL_STATE = '';

const NavbarSearchButton: FunctionComponent<NavbarSearchButtonProps> = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>(SEARCH_TEXT_INITIAL_STATE);
  const [tabValue, setTabValue] = useState<TabValue>(VALUE_INITIAL_STATE);
  const inputFieldRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const [debouncedSearchText, setDebouncedSearchText] = useDebounce(searchText, 200);

  const globalT = getClientSideI18n();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => setSearchText(e.target.value);

  return (
    <Dialog
      onOpenChange={(_isOpened: boolean) => {
        setIsOpened(_isOpened);
        setTabValue(VALUE_INITIAL_STATE);
        setSearchText(SEARCH_TEXT_INITIAL_STATE);
        setDebouncedSearchText(SEARCH_TEXT_INITIAL_STATE);
      }}
      open={isOpened}
    >
      <DialogTrigger aria-label={globalT(`${i18ns.navbar}.sr-only.open-search-menu`)} className="h-full w-4">
        <MagnifyingGlassIcon />
      </DialogTrigger>
      <DialogContent
        onAnimationEnd={() => {
          if (!isOpened) return;
          const inputFieldInstance = getRefCurrentPtr(inputFieldRef);
          if (!inputFieldInstance) return;
          inputFieldInstance.focus();
        }}
        className="h-full max-h-[90vh] max-w-[90vw]"
      >
        <DialogHeader>
          <Tabs className="flex h-full w-full flex-col px-5 py-5" onValueChange={(v) => setTabValue(v as TabValue)} value={tabValue}>
            <TabsList className="mx-auto grid w-full grid-cols-3">
              <TabsTrigger className="hover:bg-primary hover:font-bold hover:text-white focus:font-semibold" value={'all' satisfies TabValue}>
                {capitalize(globalT(`${i18ns.vocab}.all`))}
              </TabsTrigger>
              <TabsTrigger className="hover:bg-primary hover:font-bold hover:text-white focus:font-semibold" value={'pages' satisfies TabValue}>
                {capitalize(globalT(`${i18ns.vocab}.pages`))}
              </TabsTrigger>
              <TabsTrigger className="hover:bg-primary hover:font-bold hover:text-white focus:font-semibold" value={'blog' satisfies TabValue}>
                {capitalize(globalT(`${i18ns.vocab}.blog`))}
              </TabsTrigger>
            </TabsList>
            <div className="mt-5 grid w-full items-center gap-1.5">
              <Label htmlFor="modal-search">{capitalize(globalT(`${i18ns.vocab}.${tabValue}`))}</Label>
              <Input
                placeholder={`${capitalize(globalT(`${i18ns.vocab}.start-typing`))}…`}
                value={isOpened ? searchText : debouncedSearchText}
                onChange={onChange}
                ref={inputFieldRef}
                id="modal-search"
                className="mt-1"
                type="text"
              />
            </div>
            <div className="mt-5 flex flex-1 rounded-md border border-input">
              <TabsContent value={'all' satisfies TabValue} className="w-full px-3">
                {debouncedSearchText}
              </TabsContent>
              <TabsContent value={'pages' satisfies TabValue} className="w-full px-3">
                {debouncedSearchText}
              </TabsContent>
              <TabsContent value={'blog' satisfies TabValue} className="w-full px-3">
                {debouncedSearchText}
              </TabsContent>
            </div>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NavbarSearchButton;

type TabValue = 'pages' | 'blog' | 'all';
