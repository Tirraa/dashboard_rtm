import ROUTES_ROOTS from '@/config/routes';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface BarProps {}

export const Bar: FunctionComponent<BarProps> = () => {
  return (
    <>
      <h1>Hello there (Dashboard bar tab)</h1>
      <span>
        BEGIN
        <br />{' '}
        LoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br /> Lorem
        <br />
        END
        <br />
      </span>
      <Link href={ROUTES_ROOTS.WEBSITE}>Go back to the homepage</Link>
    </>
  );
};

export default Bar;