/* v8 ignore start */
// Stryker disable all

import type { WithChildren } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import Footer from '@/components/ui/Footer';

interface HtmlElementProps extends WithChildren {}

const PagesWithFooterRootElement: FunctionComponent<HtmlElementProps> = ({ children }) => (
  <>
    {children}
    <Footer />
  </>
);

export default PagesWithFooterRootElement;

// Stryker restore all
/* v8 ignore stop */
