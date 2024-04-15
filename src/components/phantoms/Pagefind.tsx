'use client';

import type { WithChildren } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import { useCurrentLocale } from '@/i18n/client';

import usePagefind from '../hooks/usePagefind';

interface PagefindPhantomProps extends WithChildren {}

const PagefindPhantom: FunctionComponent<PagefindPhantomProps> = ({ children }) => {
  const currentLocale = useCurrentLocale();
  usePagefind(currentLocale);

  return children;
};

export default PagefindPhantom;
