import Link from 'next/link';
import RoutesBase from '../_config/routes';

export const Page = () => (
  <>
    <h1>Hello there</h1>
    <Link href={RoutesBase.sitewide}>Go back to the homepage</Link>
  </>
);

export default Page;
