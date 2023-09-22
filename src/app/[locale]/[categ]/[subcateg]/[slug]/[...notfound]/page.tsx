'use client';

import { redirectToParentPath } from '@/lib/next';
import { usePathname } from 'next/navigation';

export default function Page() {
  const pathname = usePathname();
  redirectToParentPath(pathname, true);
}
