/* v8 ignore start */
// Stryker disable all

import type { WithChildren } from '@rtm/shared-types/Next';
import type { FunctionComponent } from 'react';

import SitewideNavbar from '@/components/ui/navbar/SitewideNavbar';
import PROGRESSBAR_CONFIG from '@/config/progressbar';
import dynamic from 'next/dynamic';

const NextTopLoader = dynamic(() => import('./NextTopLoader'), { ssr: false });
const GoToTopButton = dynamic(() => import('@/components/ui/misc/GoToTopButton'), { ssr: false });

interface DocumentRootProps extends WithChildren {
  disableGoToTopButton?: boolean;
  disableTopLoader?: boolean;
  withNavbar?: boolean;
}

const DocumentRoot: FunctionComponent<DocumentRootProps> = ({ disableGoToTopButton, disableTopLoader, withNavbar, children }) => (
  <>
    {!disableTopLoader && <NextTopLoader {...PROGRESSBAR_CONFIG} />}
    {withNavbar && <SitewideNavbar />}
    {children}
    {!disableGoToTopButton && <GoToTopButton />}
  </>
);

export default DocumentRoot;

// Stryker restore all
/* v8 ignore stop */
