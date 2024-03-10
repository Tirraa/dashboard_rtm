import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { FunctionComponent } from 'react';

import { useScrollDirection } from '@/components/hooks/useScrollDirection';
import { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import useIsLargeScreen from '@/components/hooks/useIsLargeScreen';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import Link from 'next/link';

import type { BlogPostTocDesktopProps } from './BlogPostTocDesktopLazy';

export interface BlogPostTocDesktopInnerProps extends BlogPostTocDesktopProps {
  ariaLabel: string;
}

const NIL_IDX = -1;
const VIEWPORT_DEAD_ZONE_ON_Y_AXIS_IN_PERCENT = 20;

function getClosestUpHeading(): MaybeNull<HTMLElement> {
  const headingsFromDOM = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')) as HTMLElement[];
  let closestHeading = null;
  let closestDistance = Infinity;
  const viewportHeight = window.innerHeight;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const bottomDeadZonePixels = (viewportHeight * VIEWPORT_DEAD_ZONE_ON_Y_AXIS_IN_PERCENT) / 100;
  const yStart = window.scrollY + viewportHeight - bottomDeadZonePixels;

  for (const heading of headingsFromDOM) {
    const distance = yStart - heading.offsetTop;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (0 < distance && distance < closestDistance) {
      closestHeading = heading;
      closestDistance = distance;
    }
  }

  return closestHeading;
}

const NewBlogPostTocDesktopInner: FunctionComponent<BlogPostTocDesktopInnerProps> = ({ ariaLabel, headings }) => {
  const isLargeScreen = useIsLargeScreen();
  const [currentHeading, setCurrentHeading] = useState<HeadingSlug>('');
  const scrollDirection = useScrollDirection();
  const observer = useRef<MaybeNull<IntersectionObserver>>(null);
  const visibleElements = useRef<VisibleElements>({});
  const headingsRef = useRef<HTMLOListElement>(null);
  const currentHeadingRef = useRef<HeadingSlug>(currentHeading);

  const getFirstVisibleHeadingSlug = useCallback(() => {
    let firstSlug = '';
    let minIndex = NIL_IDX;
    const visibleElementsInstance = getRefCurrentPtr(visibleElements);

    for (const [slug, currentIndex] of Object.entries(visibleElementsInstance)) {
      if (currentIndex !== undefined && (currentIndex < minIndex || minIndex === NIL_IDX)) {
        firstSlug = slug;
        minIndex = currentIndex;
      }
    }

    return firstSlug;
  }, []);

  const handleScrollUp = useCallback(() => {
    const visibleElementsInstance = getRefCurrentPtr(visibleElements);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (Object.keys(visibleElementsInstance).length === 0) {
      const closestUpHeading = getClosestUpHeading();
      if (closestUpHeading) setCurrentHeading(closestUpHeading.id);
      return;
    }
    const firstVisibleHeadingSlug = getFirstVisibleHeadingSlug();
    if (firstVisibleHeadingSlug) setCurrentHeading(firstVisibleHeadingSlug);
  }, [getFirstVisibleHeadingSlug]);

  const handleScrollDown = useCallback(() => {
    const firstVisibleHeadingSlug = getFirstVisibleHeadingSlug();
    if (firstVisibleHeadingSlug) setCurrentHeading(firstVisibleHeadingSlug);
  }, [getFirstVisibleHeadingSlug]);

  const slugAndIndexAssoc = useMemo(() => {
    return headings.reduce(
      (indexed, { slug }, idx) => {
        indexed[slug] = idx;
        return indexed;
      },
      {} as Record<HeadingSlug, HeadingSlugIdx>
    );
  }, [headings]);

  useEffect(() => {
    if (!isLargeScreen) return;

    const visibleElementsInstance = getRefCurrentPtr(visibleElements);

    observer.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const slug = entry.target.id;
          if (entry.isIntersecting) {
            visibleElementsInstance[slug] = slugAndIndexAssoc[slug];
          } else {
            delete visibleElementsInstance[slug];
          }
        }
      },
      {
        rootMargin: '-' + VIEWPORT_DEAD_ZONE_ON_Y_AXIS_IN_PERCENT + '% 0px',
        threshold: 0.5
      }
    );

    const observerInstance = getRefCurrentPtr(observer);

    for (const heading of headings) {
      const element: MaybeNull<HTMLElement> = document.getElementById(heading.slug);
      if (element) observerInstance.observe(element);
    }

    return () => {
      if (observerInstance) observerInstance.disconnect();
    };
  }, [headings, isLargeScreen, slugAndIndexAssoc]);

  useEffect(() => {
    if (!isLargeScreen) return;

    if (scrollDirection === 'up') window.addEventListener('scroll', handleScrollUp);
    if (scrollDirection === 'down') window.addEventListener('scroll', handleScrollDown);

    return () => {
      window.removeEventListener('scroll', handleScrollUp);
      window.removeEventListener('scroll', handleScrollDown);
    };
  }, [isLargeScreen, scrollDirection, handleScrollDown, handleScrollUp]);

  useEffect(() => {
    if (!isLargeScreen) return;

    const handleResize = () => {
      const closestUpHeading = getClosestUpHeading();
      if (closestUpHeading) setCurrentHeading(closestUpHeading.id);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isLargeScreen]);

  useEffect(() => {
    currentHeadingRef.current = currentHeading;
  }, [currentHeading]);

  useEffect(() => {
    const closestUpHeading = getClosestUpHeading();
    if (closestUpHeading) setCurrentHeading(closestUpHeading.id);
  }, []);

  return (
    <nav className="flex flex-col items-center self-start transition-[margin-top] duration-300" aria-label={ariaLabel}>
      <ol className="max-h-[40vh] w-full list-none space-y-3 overflow-auto pl-6 rtl:pl-0 rtl:pr-6" ref={headingsRef}>
        {headings.map((heading) => (
          <li key={heading.slug}>
            <Link className={heading.slug === currentHeading ? 'text-primary' : ''} href={`#${heading.slug}`}>
              {heading.content}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default NewBlogPostTocDesktopInner;

type HeadingSlug = string;
type HeadingSlugIdx = number;
type VisibleElements = Record<HeadingSlug, HeadingSlugIdx>;
