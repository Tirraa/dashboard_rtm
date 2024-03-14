/* v8 ignore start */
// Stryker disable all

import type { WithChildren } from '@rtm/shared-types/Next';

import PagesRootElement from '@/components/layouts/base/PagesRootElement';

export default function PagesLayout({ children }: WithChildren) {
  return <PagesRootElement>{children}</PagesRootElement>;
}

// Stryker restore all
/* v8 ignore stop */
