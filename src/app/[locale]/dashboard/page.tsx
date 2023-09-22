import RoutesBase from '@/config/routes';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <h1>Hello there</h1>
      <Link href={RoutesBase.WEBSITE_ROOT}>Go back to the homepage</Link>
    </>
  );
}
