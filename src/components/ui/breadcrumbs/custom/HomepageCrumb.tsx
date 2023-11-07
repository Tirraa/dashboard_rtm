import ROUTES_ROOTS from '@/config/routes';
import type { PagesTitlesKey, UnstrictScopedT } from '@/types/i18n';
import type { FunctionComponent } from 'react';
import Crumb from '../Crumb';

interface HomepageCrumbProps {
  scopedT: UnstrictScopedT;
  isLeaf?: boolean;
}

const HomepageCrumb: FunctionComponent<HomepageCrumbProps> = ({ scopedT, isLeaf }) => {
  const homepage: PagesTitlesKey = 'homepage';
  const label = scopedT(homepage);
  const href = ROUTES_ROOTS.WEBSITE;

  return <Crumb href={href} label={label} isLeaf={isLeaf} />;
};

export default HomepageCrumb;
