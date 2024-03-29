/* v8 ignore start */
// Stryker disable all

import buildPageTitle from '@rtm/shared-lib/portable/str/buildPageTitle';
import DashboardBarPage from '@/components/pages/dashboard/bar';
import { getServerSideI18n } from '@/i18n/server';
import { i18ns } from '##/config/i18n';

export async function generateMetadata() {
  const globalT = await getServerSideI18n();
  const { dashboardPagesTitles, pagesTitles } = i18ns;
  const title = buildPageTitle(globalT(`${pagesTitles}.dashboard`), globalT(`${dashboardPagesTitles}.bar`));
  return { description: '', title };
}

export default function Page() {
  return <DashboardBarPage />;
}

// Stryker restore all
/* v8 ignore stop */
