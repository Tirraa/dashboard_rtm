import ROUTES_ROOTS from '@/config/routes';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface MainProps {}

export const Main: FunctionComponent<MainProps> = () => {
  return (
    <>
      <h1>Hello there</h1>
      <Link href={ROUTES_ROOTS.WEBSITE}>Go back to the homepage</Link>
    </>
  );
};

export default Main;
