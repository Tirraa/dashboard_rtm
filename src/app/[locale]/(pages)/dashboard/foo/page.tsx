import DashboardFooPage from '@/components/pages/dashboard/foo';
import { i18ns } from '@/config/i18n';
import { getServerSideI18n } from '@/i18n/server';
import { getPageTitle } from '@/lib/str';

export async function generateMetadata() {
  const globalT = await getServerSideI18n();

  const title = getPageTitle(globalT(`${i18ns.pagesTitles}.dashboard`), globalT(`${i18ns.dashboard}.pages-titles.foo`));
  return { title, description: '' };
}

export default function Page() {
  return <DashboardFooPage />;
}
