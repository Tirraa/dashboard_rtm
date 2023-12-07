import { i18ns } from '##/config/i18n';
import DashboardFooPage from '@/components/pages/dashboard/foo';
import { getServerSideI18n } from '@/i18n/server';
import { buildPageTitle } from '@rtm/shared-lib/str';

export async function generateMetadata() {
  const globalT = await getServerSideI18n();

  const title = buildPageTitle(globalT(`${i18ns.pagesTitles}.dashboard`), globalT(`${i18ns.dashboardPagesTitles}.foo`));
  return { title, description: '' };
}

export default function Page() {
  return <DashboardFooPage />;
}
