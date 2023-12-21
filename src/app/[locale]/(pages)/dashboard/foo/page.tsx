/* v8 ignore start */
import DashboardFooPage from '@/components/pages/dashboard/foo';
import { buildPageTitle } from '@rtm/shared-lib/str';
import { getServerSideI18n } from '@/i18n/server';
import { i18ns } from '##/config/i18n';

export async function generateMetadata() {
  const globalT = await getServerSideI18n();
  const { dashboardPagesTitles, pagesTitles } = i18ns;
  const title = buildPageTitle(globalT(`${pagesTitles}.dashboard`), globalT(`${dashboardPagesTitles}.foo`));
  return { description: '', title };
}

export default function Page() {
  return <DashboardFooPage />;
}
/* v8 ignore stop */
