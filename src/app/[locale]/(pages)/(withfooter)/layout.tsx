/* v8 ignore start */
// Stryker disable all

import type { WithChildren } from '@rtm/shared-types/Next';

import PagesWithFooterRootElement from '@/components/layouts/base/PagesWithFooterRootElement';

export default function PagesLayout({ children }: WithChildren) {
  return <PagesWithFooterRootElement>{children}</PagesWithFooterRootElement>;
}

// Stryker restore all
/* v8 ignore stop */
