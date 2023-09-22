'use client';

import { getClientSideI18n } from '@/i18n/client';
import { FunctionComponent } from 'react';

interface NotFoundInnerProps {}

export const NotFoundInner: FunctionComponent<NotFoundInnerProps> = () => {
  const globalT = getClientSideI18n();
  return (
    <div className="flex flex-1 h-full items-center justify-center">
      <h1 className="m-auto">{globalT('vocab.404')}</h1>
    </div>
  );
};

export default NotFoundInner;
