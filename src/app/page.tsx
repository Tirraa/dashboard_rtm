import HomepageInner from '@/components/pagesInner/Homepage';
import { FunctionComponent } from 'react';

interface HomePageProps {}

export const Page: FunctionComponent<HomePageProps> = () => (
  <main className="flex flex-1 flex-col align-center justify-center w-screen text-center p-0">
    <HomepageInner />
  </main>
);

export default Page;
