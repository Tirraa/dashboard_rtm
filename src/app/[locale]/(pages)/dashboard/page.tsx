import DashboardMainPage from '@/components/pages/dashboard/main';
import { i18ns } from '@/config/i18n';
import { getServerSideI18n } from '@/i18n/server';
import { getPageTitle } from '@/lib/str';

export async function generateMetadata() {
  const globalT = await getServerSideI18n();

  const title = getPageTitle(globalT(`${i18ns.blogCategories}.patch-notes.dashboard.title`), globalT(`${i18ns.dashboard}.pages-titles.main`));
  return { title, description: '' };
}

export default function Page() {
  return <DashboardMainPage />;
}
