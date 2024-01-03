/* v8 ignore start */
// Stryker disable all
import type { FunctionComponent } from 'react';

import ROUTES_ROOTS from '##/config/routes';
import Link from 'next/link';

interface DashboardMainPageProps {}

const DashboardMainPage: FunctionComponent<DashboardMainPageProps> = () => {
  return (
    <>
      <h1>Hello there</h1>
      <Link href={ROUTES_ROOTS.WEBSITE}>Go back to the homepage</Link>
    </>
  );
};

export default DashboardMainPage;
// Stryker restore all
/* v8 ignore stop */
