import HomepageInner from '@/components/pagesInner/Homepage';
import { i18nPageProps } from '@/types/Next';

interface PageParams extends i18nPageProps {}

export default function Page({ params }: PageParams) {
  return (
    <main className="flex flex-1 flex-col align-center justify-center w-screen text-center p-0">
      <HomepageInner {...{ i18nProps: { ...params } }} />
    </main>
  );
}
