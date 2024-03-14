/* v8 ignore start */
// Stryker disable all

import type { WithChildren } from '@rtm/shared-types/Next';

import LandingPagesRootElement from '@/components/layouts/base/LandingPagesRootElement';

export default function LandingPagesLayout({ children }: WithChildren) {
  return <LandingPagesRootElement>{children}</LandingPagesRootElement>;
}

// Stryker restore all
/* v8 ignore stop */
