import ROUTES_ROOTS from '@/config/routes';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface FooProps {}

export const Foo: FunctionComponent<FooProps> = () => {
  return (
    <>
      <h1>Hello there (Dashboard foo tab)</h1>
      <Link href={ROUTES_ROOTS.WEBSITE}>Go back to the homepage</Link>
    </>
  );
};

export default Foo;
