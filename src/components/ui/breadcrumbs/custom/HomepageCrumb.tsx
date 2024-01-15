'use client';

import type { FunctionComponent } from 'react';

import { useScopedI18n } from '@/i18n/client';
import ROUTES_ROOTS from '##/config/routes';
import { i18ns } from '##/config/i18n';

import Crumb from '../Crumb';

interface HomepageCrumbProps {
  isLeaf?: boolean;
}

const HomepageCrumb: FunctionComponent<HomepageCrumbProps> = ({ isLeaf }) => {
  const { pagesTitles } = i18ns;
  const scopedT = useScopedI18n(pagesTitles);
  const label = scopedT('homepage');
  const href = ROUTES_ROOTS.WEBSITE;

  return <Crumb isLeaf={isLeaf} label={label} href={href} />;
};

export default HomepageCrumb;
