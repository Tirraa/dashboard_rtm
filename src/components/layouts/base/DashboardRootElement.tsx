/* v8 ignore start */
// Stryker disable all

import type { WithChildren } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import DocumentRoot from '@/components/layouts/base/DocumentRoot';

interface HtmlElementProps extends WithChildren {}

const DashboardRootElement: FunctionComponent<HtmlElementProps> = ({ children }) => (
  <DocumentRoot disableGoToTopButton withNavbar>
    {children}
  </DocumentRoot>
);

export default DashboardRootElement;

// Stryker restore all
/* v8 ignore stop */
