import type { CustomCrumbs, CustomCrumb } from '@rtm/shared-types/Breadcrumbs';
import type { I18nVocabTarget } from '@rtm/shared-types/I18n';
import type { FunctionComponent, ReactElement } from 'react';
import type { Index } from '@rtm/shared-types/Numbers';
import type { AppPath } from '@rtm/shared-types/Next';

import buildAbsolutePathFromParts from '@rtm/shared-lib/portable/str/buildAbsolutePathFromParts';
import PAGES_TITLES from '@/i18n/locales/fragments/schema/pagesTitles';
import capitalize from '@/lib/portable/str/capitalize';
import getPathParts from '@/lib/misc/getPathParts';
import { getServerSideI18n } from '@/i18n/server';
import { i18ns } from '##/config/i18n';

import Crumb from './Crumb';

interface BreadcrumbsProps {
  customCrumbs?: CustomCrumbs;
  className?: string;
  pathname: AppPath;
}

function crumbsGenerator(
  pathParts: string[],
  pagesTitlesParts: string[],
  customCrumbsDepths: Index[] = [],
  customCrumbs?: CustomCrumbs
): ReactElement[] {
  function buildCurrentPath(pathParts: string[], depth: Index) {
    // eslint-disable-next-line no-magic-numbers
    const currentPathParts = pathParts.slice(0, depth + 1);
    const currentPath = buildAbsolutePathFromParts(...currentPathParts);
    return currentPath;
  }

  const crumbs: ReactElement[] = [];

  function crumbGenerator(depth: Index, isLeaf: boolean, href: string) {
    // eslint-disable-next-line no-magic-numbers
    if (customCrumbs && customCrumbsDepths.includes(depth + 1)) {
      // eslint-disable-next-line no-magic-numbers
      return (customCrumbs.find(({ depth: _depth }) => _depth === depth + 1) as CustomCrumb).jsx;
    }

    const label = pagesTitlesParts[depth];
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

const Breadcrumbs: FunctionComponent<BreadcrumbsProps> = async ({ customCrumbs, className, pathname }) => {
  const globalT = await getServerSideI18n();
  const customCrumbsDepths = customCrumbs?.map(({ depth }) => depth) ?? [];

  const pathParts = getPathParts(pathname);
  const pagesTitlesParts = pathParts.reduce((acc, part, currentIndex) => {
    // eslint-disable-next-line no-magic-numbers
    if (customCrumbsDepths.includes(currentIndex + 1)) {
      acc.push('');
      return acc;
    }

    const missingLabel = !Object.keys(PAGES_TITLES).includes(part);
    if (missingLabel) throw new Error(`Missing pages-titles label: ${part}`);

    acc.push(globalT(`${i18ns.pagesTitles}.${part}` as I18nVocabTarget));
    return acc;
  }, [] as string[]);

  return (
    <nav aria-label={capitalize(globalT(`${i18ns.vocab}.breadcrumbs`))} data-pagefind-ignore="all" className={className}>
      <ol className="flex w-fit flex-wrap justify-center gap-y-1 rounded-lg bg-accent bg-opacity-75 px-3 py-2 text-center lg:justify-normal">
        {crumbsGenerator(pathParts, pagesTitlesParts, customCrumbsDepths, customCrumbs)}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
