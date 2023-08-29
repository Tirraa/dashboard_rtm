import HomepageInner from '@/components/pagesInner/Homepage';
import { i18nParamsProps } from '@/types/Next';

interface PageParams extends i18nParamsProps {}

export default function Page(params: PageParams) {
  return (
    <main className="flex flex-1 flex-col align-center justify-center w-screen text-center p-0">
      <HomepageInner {...params} />
    </main>
  );
}
