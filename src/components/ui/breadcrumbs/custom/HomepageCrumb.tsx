import type { UnstrictScopedT, PagesTitlesKey } from '@rtm/shared-types/I18n';
import type { FunctionComponent } from 'react';

import ROUTES_ROOTS from '##/config/routes';

import Crumb from '../Crumb';

interface HomepageCrumbProps {
  scopedT: UnstrictScopedT;
  isLeaf?: boolean;
}

const HomepageCrumb: FunctionComponent<HomepageCrumbProps> = ({ scopedT, isLeaf }) => {
  const homepage: PagesTitlesKey = 'homepage';
  const label = scopedT(homepage);
  const href = ROUTES_ROOTS.WEBSITE;

  return <Crumb isLeaf={isLeaf} label={label} href={href} />;
};

export default HomepageCrumb;
