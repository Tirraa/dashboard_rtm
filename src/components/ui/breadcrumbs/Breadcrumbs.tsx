'use client';

import { i18ns } from '##/config/i18n';
import ROUTES_ROOTS from '##/config/routes';
import type { PagesTitlesKey, UnstrictScopedT } from '##/types/hell/i18n';
import { useScopedI18n } from '@/i18n/client';
import { getPathParts } from '@/lib/next';
import { fromKebabCaseToSentenceCase } from '@/lib/str';
import { buildAbsolutePathFromParts } from '@rtm/shared-lib/src/str';
import type { CustomCrumbs } from '@rtm/shared-types/src/Breadcrumbs';
import { usePathname } from 'next/navigation';
import type { FunctionComponent, ReactNode } from 'react';
import Crumb from './Crumb';
import CrumbSeparator from './CrumbSeparator';
import HomepageCrumb from './custom/HomepageCrumb';

interface BreadcrumbsProps {
  withHomepageElement?: boolean;
  customCrumbs?: CustomCrumbs;
  className?: string;
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
          <HomepageCrumb scopedT={scopedT} />
          <CrumbSeparator />
        </>
      ]
    : [];

  function crumbGenerator(depth: number, isLeaf: boolean, href: string) {
    if (customCrumbs) {
      for (const customComponent of customCrumbs) {
        if (customComponent.depth === depth + 1) return customComponent.jsx;
      }
    }

    const retrievedVocabFromPathPart = scopedT(pathParts[depth] as PagesTitlesKey);
    const shouldGenerateAFallbackLabel = retrievedVocabFromPathPart === pathParts[depth];
    const fallbackLabel = shouldGenerateAFallbackLabel ? fromKebabCaseToSentenceCase(retrievedVocabFromPathPart) : undefined;
    const label = fallbackLabel ?? retrievedVocabFromPathPart;
    const withRescueCtx = fallbackLabel !== undefined;

    return <Crumb label={label} href={href} isLeaf={isLeaf} withRescueCtx={withRescueCtx} />;
  }

  for (let depth = 0; depth < pathParts.length; depth++) {
    const isLeaf = pathParts[depth + 1] === undefined;
    const href = buildCurrentPath(pathParts, depth);
    const crumb = crumbGenerator(depth, isLeaf, href);
    crumbs.push(<li key={`breadcrumbs-part-${depth}`}>{crumb}</li>);
  }
  return crumbs;
}

export const Breadcrumbs: FunctionComponent<BreadcrumbsProps> = ({ withHomepageElement: maybeWithHomepageElement, customCrumbs, className }) => {
  const pathname = usePathname();
  const pathParts = getPathParts(pathname);
  const withHomepageElement = Boolean(maybeWithHomepageElement);
  const scopedT = useScopedI18n(i18ns.pagesTitles);
  const scopedT2 = useScopedI18n(i18ns.vocab);

  if (pathname === ROUTES_ROOTS.WEBSITE) return withHomepageElement ? <HomepageCrumb scopedT={scopedT} isLeaf /> : null;
  return (
    <nav aria-label={scopedT2('breadcrumbs')} className={className}>
      <ol className="flex w-fit flex-wrap gap-y-1 rounded-lg bg-accent bg-opacity-75 px-3 py-2">
        {crumbsGenerator(pathParts, withHomepageElement, scopedT, customCrumbs)}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
