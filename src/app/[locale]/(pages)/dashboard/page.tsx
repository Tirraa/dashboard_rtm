import { i18ns } from '##/config/i18n';
import DashboardMainPage from '@/components/pages/dashboard/main';
import { getServerSideI18n } from '@/i18n/server';
import { buildPageTitle } from '@rtm/shared-lib/str';

export async function generateMetadata() {
  const globalT = await getServerSideI18n();
  const { pagesTitles, dashboardPagesTitles } = i18ns;
  const title = buildPageTitle(globalT(`${pagesTitles}.dashboard`), globalT(`${dashboardPagesTitles}.main`));
  return { title, description: '' };
}

export default function Page() {
  return <DashboardMainPage />;
}
