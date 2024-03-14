/* v8 ignore start */
// Stryker disable all

import type { WithChildren } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import DocumentRoot from '@/components/layouts/base/DocumentRoot';

interface HtmlElementProps extends WithChildren {}

const LandingPagesRootElement: FunctionComponent<HtmlElementProps> = ({ children }) => <DocumentRoot disableGoToTopButton>{children}</DocumentRoot>;

export default LandingPagesRootElement;

// Stryker restore all
/* v8 ignore stop */
