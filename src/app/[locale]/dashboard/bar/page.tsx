import { i18ns } from '@/config/i18n';
import ROUTES_ROOTS from '@/config/routes';
import { getServerSideI18n } from '@/i18n/server';
import { getPageTitle } from '@/lib/str';
import Link from 'next/link';

export async function generateMetadata() {
  const globalT = await getServerSideI18n();

  const title = getPageTitle(globalT(`${i18ns.blogCategories}.patch-notes.dashboard.title`), globalT(`${i18ns.dashboard}.pages-titles.bar`));
  const description = '';
  return { title, description };
}

export default function Page() {
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
}
