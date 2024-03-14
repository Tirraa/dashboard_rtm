/* v8 ignore start */
// Stryker disable all

import type { EmptyString } from '@rtm/shared-types/CustomUtilityTypes';

import PagesRootElement from '@/components/layouts/base/PagesRootElement';
import buildPageTitle from '@rtm/shared-lib/portable/str/buildPageTitle';
import NotFound from '@/components/pages/Notfound';
import { getScopedI18n } from '@/i18n/server';
import { i18ns } from '##/config/i18n';

export async function generateMetadata() {
  const scopedT = await getScopedI18n(i18ns.vocab);

  const title = buildPageTitle(scopedT('brand-short'), scopedT('404'));
  const description: EmptyString = '';

  return { description, title };
}

const NotFoundPage = () => (
  <PagesRootElement>
    <NotFound />
  </PagesRootElement>
);

export default NotFoundPage;

// Stryker restore all
/* v8 ignore stop */
