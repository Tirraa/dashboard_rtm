'use client';

import ROUTES_ROOTS from '@/config/routes';
import { useScopedI18n } from '@/i18n/client';
import { getPathParts } from '@/lib/next';
import { buildAbsolutePathFromParts } from '@/lib/str';
import type { CustomCrumbs } from '@/types/Breadcrumbs';
import type { PagesTitlesKey, UnstrictScopedT } from '@/types/i18n';
import * as changeCase from 'change-case';
import { usePathname } from 'next/navigation';
import type { FunctionComponent, ReactNode } from 'react';
import Crumb from './Crumb';
import CrumbSeparator from './CrumbSeparator';
import HomepageCrumb from './custom/HomepageCrumb';

interface BreadcrumbsProps {
  withHomepageElement?: boolean;
  customCrumbs: CustomCrumbs;
}

function crumbsGenerator(pathParts: string[], withHomepageElement: boolean, scopedT: UnstrictScopedT, customCrumbs?: CustomCrumbs): ReactNode[] {
  function buildCurrentPath(pathParts: string[], depth: number) {
    const currentPathParts = pathParts.slice(0, depth + 1);
    const currentPath = buildAbsolutePathFromParts(...currentPathParts);
    return currentPath;
  }

  const crumbs: ReactNode[] = withHomepageElement
    ? [
        <>
          <HomepageCrumb {...{ scopedT }} />
          <CrumbSeparator />
        </>
      ]
    : [];

  function crumbGenerator(depth: number, isLeaf: boolean, href?: string) {
    if (customCrumbs) {
      for (const customComponent of customCrumbs) {
        if (customComponent.depth === depth + 1) return customComponent.jsx;
      }
    }

    const retrievedVocabFromPathPart = scopedT(pathParts[depth] as PagesTitlesKey);
    const shouldGenerateAFallbackLabel = retrievedVocabFromPathPart === pathParts[depth];
    const fallbackLabel = shouldGenerateAFallbackLabel ? changeCase.sentenceCase(retrievedVocabFromPathPart) : undefined;
    const label = fallbackLabel ?? retrievedVocabFromPathPart;
    return <Crumb {...{ label, href, isLeaf }} />;
  }

  for (let depth = 0; pathParts[depth]; depth++) {
    const isLeaf = pathParts[depth + 1] === undefined;
    const href = !isLeaf ? buildCurrentPath(pathParts, depth) : undefined;
    const crumb = crumbGenerator(depth, isLeaf, href);
    crumbs.push(<li key={`breadcrumbs-part-${depth}`}>{crumb}</li>);
  }
  return crumbs;
}

export const Breadcrumbs: FunctionComponent<BreadcrumbsProps> = ({ withHomepageElement: maybeWithHomepageElement, customCrumbs }) => {
  const pathname = usePathname();
  const pathParts = getPathParts(pathname);
  const withHomepageElement = Boolean(maybeWithHomepageElement);
  const scopedT = useScopedI18n('pages-titles');

  if (pathname === ROUTES_ROOTS.WEBSITE) return withHomepageElement ? <HomepageCrumb {...{ scopedT }} isLeaf /> : null;
  return <ul className="flex">{crumbsGenerator(pathParts, withHomepageElement, scopedT, customCrumbs)}</ul>;
};

export default Breadcrumbs;
