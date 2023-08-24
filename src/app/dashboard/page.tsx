import RoutesBase from '@/config/routes';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface DashboardPageProps {}

export const Page: FunctionComponent<DashboardPageProps> = () => (
  <>
    <h1>Hello there</h1>
    <Link href={RoutesBase.sitewide}>Go back to the homepage</Link>
  </>
);

export default Page;
