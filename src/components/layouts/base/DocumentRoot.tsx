/* v8 ignore start */
// Stryker disable all

import type { LayoutBaseProps } from '@/types/Next';
import type { FunctionComponent } from 'react';

import { BODY_CONTAINER_CLS } from '@/components/config/styles/body';
import SitewideNavbar from '@/components/ui/navbar/SitewideNavbar';
import { SpeedInsights } from '@vercel/speed-insights/next';
import PROGRESSBAR_CONFIG from '@/config/progressbar';
import I18nTaxonomy from '##/config/taxonomies/i18n';
import ELEMENTS_ID from '@/config/elementsId';
import Providers from '@/contexts/Providers';
import { getServerSession } from 'next-auth';
import dynamic from 'next/dynamic';

const NextTopLoader = dynamic(() => import('./NextTopLoader'), { ssr: false });

interface DocumentRootProps extends LayoutBaseProps {
  disableTopLoader?: boolean;
  withNavbar?: boolean;
}

const DocumentRoot: FunctionComponent<DocumentRootProps> = async ({ disableTopLoader, withNavbar, children, params }) => {
  const language = params[I18nTaxonomy.LANGUAGE];
  const session = await getServerSession();

  return (
    <>
      <div id={ELEMENTS_ID.BODY_CONTAINER} className={BODY_CONTAINER_CLS}>
        <Providers locale={language} session={session}>
          {!disableTopLoader && <NextTopLoader {...PROGRESSBAR_CONFIG} />}
          {withNavbar && <SitewideNavbar />}
          {children}
        </Providers>
      </div>
      <SpeedInsights />
    </>
  );
};

export default DocumentRoot;

// Stryker restore all
/* v8 ignore stop */
