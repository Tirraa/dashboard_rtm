import Caca from '@/components/Caca';
import CacaAsync from '@/components/CacaAsync';
import DashboardNavbar from '@/components/Navbar';

export default function Home() {
  return (
    <main>
      <DashboardNavbar />
      <Caca />
      <br />
      <CacaAsync />
    </main>
  );
}
