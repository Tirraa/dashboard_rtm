'use client';

import type { UnstrictScopedT, PagesTitlesKey } from '@rtm/shared-types/I18n';
import type { CustomCrumbs } from '@rtm/shared-types/Breadcrumbs';
import type { FunctionComponent, ReactNode } from 'react';

import { buildAbsolutePathFromParts } from '@rtm/shared-lib/str';
import { fromKebabCaseToSentenceCase } from '@/lib/str';
import { useScopedI18n } from '@/i18n/client';
import { usePathname } from 'next/navigation';
import ROUTES_ROOTS from '##/config/routes';
import { getPathParts } from '@/lib/next';
import { i18ns } from '##/config/i18n';

import HomepageCrumb from './custom/HomepageCrumb';
import CrumbSeparator from './CrumbSeparator';
import Crumb from './Crumb';

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

    return <Crumb withRescueCtx={withRescueCtx} isLeaf={isLeaf} label={label} href={href} />;
  }

  for (let depth = 0; depth < pathParts.length; depth++) {
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

  if (pathname === ROUTES_ROOTS.WEBSITE) return withHomepageElement ? <HomepageCrumb scopedT={scopedT} isLeaf /> : null;
  return (
    <nav aria-label={scopedT2('breadcrumbs')} className={className}>
      <ol className="flex w-fit flex-wrap justify-center gap-y-1 rounded-lg bg-accent bg-opacity-75 px-3 py-2 lg:justify-normal">
        {crumbsGenerator(pathParts, withHomepageElement, scopedT, customCrumbs)}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
