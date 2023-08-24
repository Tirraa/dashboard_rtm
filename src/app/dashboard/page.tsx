import RoutesBase from '@/config/routes';
import Link from 'next/link';

export const Page = () => (
  <>
    <h1>Hello there</h1>
    <Link href={RoutesBase.sitewide}>Go back to the homepage</Link>
  </>
);

export default Page;
