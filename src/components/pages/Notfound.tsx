'use client';

import { i18ns } from '@/config/i18n';
import { getClientSideI18n } from '@/i18n/client';
import { FunctionComponent } from 'react';

interface NotFoundProps {}

export const NotFound: FunctionComponent<NotFoundProps> = () => {
  const globalT = getClientSideI18n();
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <h1 className="m-auto">{globalT(`${i18ns.vocab}.404`)}</h1>
    </div>
  );
};

export default NotFound;
