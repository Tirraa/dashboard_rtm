/* v8 ignore start */
// Stryker disable all

import buildPageTitle from '@rtm/shared-lib/portable/str/buildPageTitle';
import DashboardMainPage from '@/components/pages/dashboard/main';
import { getServerSideI18n } from '@/i18n/server';
import { i18ns } from '##/config/i18n';

export async function generateMetadata() {
  const globalT = await getServerSideI18n();
  const { dashboardPagesTitles, pagesTitles } = i18ns;
  const title = buildPageTitle(globalT(`${pagesTitles}.dashboard`), globalT(`${dashboardPagesTitles}.main`));
  return { description: '', title };
}

export default function Page() {
  return <DashboardMainPage />;
}

// Stryker restore all
/* v8 ignore stop */
