import DashboardMainPage from '@/components/pages/dashboard/main';
import { getServerSideI18n } from '@/i18n/server';
import { buildPageTitle } from '@/lib/str';
import { i18ns } from 'interop/config/i18n';

export async function generateMetadata() {
  const globalT = await getServerSideI18n();

  const title = buildPageTitle(globalT(`${i18ns.pagesTitles}.dashboard`), globalT(`${i18ns.dashboard}.pages-titles.main`));
  return { title, description: '' };
}

export default function Page() {
  return <DashboardMainPage />;
}
