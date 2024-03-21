/* v8 ignore start */
// Stryker disable all

import type { WithChildren } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import DocumentRoot from '@/components/layouts/base/DocumentRoot';

interface HtmlElementProps extends WithChildren {}

const PagesRootElement: FunctionComponent<HtmlElementProps> = ({ children }) => <DocumentRoot withNavbar>{children}</DocumentRoot>;

export default PagesRootElement;

// Stryker restore all
/* v8 ignore stop */
