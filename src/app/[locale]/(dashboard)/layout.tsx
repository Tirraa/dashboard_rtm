/* v8 ignore start */
// Stryker disable all

import type { WithChildren } from '@rtm/shared-types/Next';

import DashboardRootElement from '@/components/layouts/base/DashboardRootElement';

export default function DashboardLayout({ children }: WithChildren) {
  return <DashboardRootElement>{children}</DashboardRootElement>;
}

// Stryker restore all
/* v8 ignore stop */
