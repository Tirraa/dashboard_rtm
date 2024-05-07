'use client';

import type { FunctionComponent } from 'react';

import { Alert } from '@/components/ui/Alert';
import { useScopedI18n } from '@/i18n/client';
import { SearchX } from 'lucide-react';
import { i18ns } from '##/config/i18n';

interface NoResultFoundProps {}

const NoResultFound: FunctionComponent<NoResultFoundProps> = () => {
  const scopedT = useScopedI18n(`${i18ns.searchMenu}`);

  return (
    <div className="m-auto flex select-none flex-col gap-4">
      <SearchX className="search-menu-no-result-found-icon m-auto" />
      <Alert className="search-menu-no-result-found w-fit">{scopedT('nothing-found')}</Alert>
    </div>
  );
};

export default NoResultFound;
