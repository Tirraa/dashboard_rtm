/* v8 ignore start */
// Stryker disable all
import type { FunctionComponent } from 'react';

import ROUTES_ROOTS from '##/config/routes';
import Link from 'next/link';

interface DashboardFooPageProps {}

const DashboardFooPage: FunctionComponent<DashboardFooPageProps> = () => {
  return (
    <>
      <h1>Hello there (Dashboard foo tab)</h1>
      <Link href={ROUTES_ROOTS.WEBSITE}>Go back to the homepage</Link>
    </>
  );
};

export default DashboardFooPage;
/* v8 ignore stop */
// Stryker restore all
