import ROUTES_ROOTS from '##/config/routes';
import Link from 'next/link';
import type { FunctionComponent } from 'react';

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
