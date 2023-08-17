import Test from '@/app/_components/Test';
import TestAsync from '@/app/_components/TestAsync';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-1">
      <Test />
      <TestAsync />
      <Link href="/dashboard">Go to Dashboard</Link>
    </main>
  );
}
