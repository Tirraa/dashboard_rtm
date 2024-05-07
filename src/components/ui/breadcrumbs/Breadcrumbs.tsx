'use client';

import type { CustomCrumbs } from '@rtm/shared-types/Breadcrumbs';
import type { PagesTitlesKey } from '@rtm/shared-types/I18n';
import type { FunctionComponent, ReactElement } from 'react';
import type { Index } from '@rtm/shared-types/Numbers';
import type { getScopedI18n } from '@/i18n/server';

import buildAbsolutePathFromParts from '@rtm/shared-lib/portable/str/buildAbsolutePathFromParts';
import PAGES_TITLES from '@/i18n/locales/fragments/schema/pagesTitles';
import getPathParts from '@/lib/misc/getPathParts';
import { useScopedI18n } from '@/i18n/client';
import { usePathname } from 'next/navigation';
import ROUTES_ROOTS from '##/config/routes';
import { i18ns } from '##/config/i18n';
import { capitalize } from '@/lib/str';

import HomepageCrumb from './custom/HomepageCrumb';
import CrumbSeparator from './CrumbSeparator';
import Crumb from './Crumb';

interface BreadcrumbsProps {
  withHomepageElement?: boolean;
  customCrumbs?: CustomCrumbs;
  className?: string;
}

function crumbsGenerator(
  pathParts: string[],
  withHomepageElement: boolean,
  scopedT: Awaited<ReturnType<typeof getScopedI18n<typeof i18ns.pagesTitles>>>,
  customCrumbs?: CustomCrumbs
): ReactElement[] {
  function buildCurrentPath(pathParts: string[], depth: Index) {
    // eslint-disable-next-line no-magic-numbers
    const currentPathParts = pathParts.slice(0, depth + 1);
    const currentPath = buildAbsolutePathFromParts(...currentPathParts);
    return currentPath;
  }

  const crumbs: ReactElement[] = withHomepageElement
    ? [
        <>
          <HomepageCrumb />
          <CrumbSeparator />
        </>
      ]
    : [];

  function crumbGenerator(depth: Index, isLeaf: boolean, href: string) {
    if (customCrumbs) {
      for (const customComponent of customCrumbs) {
        // eslint-disable-next-line no-magic-numbers
        if (customComponent.depth === depth + 1) return customComponent.jsx;
      }
    }

    const missingLabel = !Object.keys(PAGES_TITLES).includes(pathParts[depth]);
    if (missingLabel) throw new Error(`Missing pages-titles label: ${pathParts[depth]}`);

    const label = scopedT(pathParts[depth] as PagesTitlesKey);
    return <Crumb isLeaf={isLeaf} label={label} href={href} />;
  }

  for (let depth = 0; depth < pathParts.length; depth++) {
    // eslint-disable-next-line no-magic-numbers
    const isLeaf = pathParts[depth + 1] === undefined;
    const href = buildCurrentPath(pathParts, depth);
    const crumb = crumbGenerator(depth, isLeaf, href);
    crumbs.push(<li key={`breadcrumbs-part-${depth}`}>{crumb}</li>);
  }
  return crumbs;
}

const Breadcrumbs: FunctionComponent<BreadcrumbsProps> = ({ withHomepageElement: maybeWithHomepageElement, customCrumbs, className }) => {
  const pathname = usePathname();
  const pathParts = getPathParts(pathname);
  const withHomepageElement = Boolean(maybeWithHomepageElement);
  const { pagesTitles, vocab } = i18ns;
  const scopedT = useScopedI18n(pagesTitles);
  const scopedT2 = useScopedI18n(vocab);

  if (pathname === ROUTES_ROOTS.WEBSITE) return withHomepageElement ? <HomepageCrumb isLeaf /> : null;

  return (
    <nav aria-label={capitalize(scopedT2('breadcrumbs'))} data-pagefind-ignore="all" className={className}>
      <ol className="flex w-fit flex-wrap justify-center gap-y-1 rounded-lg bg-accent bg-opacity-75 px-3 py-2 text-center lg:justify-normal">
        {crumbsGenerator(pathParts, withHomepageElement, scopedT, customCrumbs)}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
