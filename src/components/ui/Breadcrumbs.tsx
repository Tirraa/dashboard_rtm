'use client';

import ROUTES_ROOTS from '@/config/routes';
import { getPathParts } from '@/lib/next';
import { buildAbsolutePathFromParts } from '@/lib/str';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FunctionComponent, ReactNode } from 'react';

interface HomepagebreadcrumbsElementProps {}

const HomepagebreadcrumbsElement: FunctionComponent<HomepagebreadcrumbsElementProps> = () => {
  return <Link href={ROUTES_ROOTS.WEBSITE}>Homepage</Link>;
};

interface BreadcrumbsProps {
  displayHomepageElement?: boolean;
}

function breadcrumbsElementsGenerator(pathParts: string[], displayHomepageElement: boolean): ReactNode[] {
  function buildCurrentPath(pathParts: string[], index: number) {
    const currentPathParts = pathParts.slice(0, index + 1);
    const currentPath = buildAbsolutePathFromParts(...currentPathParts);
    return currentPath;
  }

  const breadcrumbsElementsSeparator = <span>/</span>;

  const nodes: ReactNode[] = displayHomepageElement
    ? [
        <>
          <HomepagebreadcrumbsElement />
          {breadcrumbsElementsSeparator}
        </>
      ]
    : [];

  for (let i = 0; pathParts[i]; i++) {
    nodes.push(
      <li key={`breadcrumbs-part-${i}`}>
        {pathParts[i + 1] ? (
          <>
            <Link href={buildCurrentPath(pathParts, i)}>{pathParts[i]}</Link>
            {breadcrumbsElementsSeparator}
          </>
        ) : (
          <span>{pathParts[i]}</span>
        )}
      </li>
    );
  }
  return nodes;
}

export const Breadcrumbs: FunctionComponent<BreadcrumbsProps> = ({ displayHomepageElement: displayHomepageElementValue }) => {
  const pathname = usePathname();
  const pathParts = getPathParts(pathname);
  const displayHomepageElement = Boolean(displayHomepageElementValue);

  if (pathname === ROUTES_ROOTS.WEBSITE) return displayHomepageElement ? <HomepagebreadcrumbsElement /> : <></>;
  return <ul className="flex">{breadcrumbsElementsGenerator(pathParts, displayHomepageElement)}</ul>;
};

export default Breadcrumbs;
