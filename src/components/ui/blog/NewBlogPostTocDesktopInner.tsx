import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { FunctionComponent } from 'react';

import { useScrollDirection } from '@/components/hooks/useScrollDirection';
import { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { computeHTMLElementHeight } from 'packages/shared-lib/src/html';
import useIsLargeScreen from '@/components/hooks/useIsLargeScreen';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

import type { BlogPostTocDesktopProps } from './BlogPostTocDesktopLazy';

import BlogPostTocCollapseButton, { COLLAPSE_BUTTON_HEIGTH_IN_PX } from './BlogPostTocCollapseButton';

export interface BlogPostTocDesktopInnerProps extends BlogPostTocDesktopProps {
  ariaLabel: string;
}

const NIL_IDX = -1;
const VIEWPORT_DEAD_ZONE_ON_Y_AXIS_IN_PERCENT = 15;
const TOC_SCROLL_TOP_OFFSET_IN_PX: number = 192;
const MAGNETIZED_NAVBAR_Y_SCROLL_THRESHOLD_IN_PX: number = 192;

const getAllDocumentHeadingsFromDOM = () => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const h1 = Array.from(document.querySelectorAll('h1')).slice(1);
  const hN = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'));
  return [...h1, ...hN] as HTMLElement[];
};

function getClosestUpHeadingFromBottom(): MaybeNull<HTMLElement> {
  const headingsFromDOM = getAllDocumentHeadingsFromDOM();
  let closestHeading = null;
  let closestDistance = Infinity;
  const viewportHeight = window.innerHeight;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const deadZoneInPx = (viewportHeight * VIEWPORT_DEAD_ZONE_ON_Y_AXIS_IN_PERCENT) / 100;
  const yStart = window.scrollY + viewportHeight - deadZoneInPx;

  for (const heading of headingsFromDOM) {
    const distance = yStart - heading.offsetTop;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (0 <= distance && distance <= closestDistance) {
      closestHeading = heading;
      closestDistance = distance;
    }
  }

  return closestHeading;
}

function getClosestUpHeadingFromTop(): MaybeNull<HTMLElement> {
  const headingsFromDOM = getAllDocumentHeadingsFromDOM();
  let closestHeading = null;
  let closestDistance = -Infinity;
  const viewportHeight = window.innerHeight;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const deadZoneInPx = (viewportHeight * VIEWPORT_DEAD_ZONE_ON_Y_AXIS_IN_PERCENT) / 100;
  const yStart = window.scrollY + deadZoneInPx;

  for (const heading of headingsFromDOM) {
    const distance = yStart - heading.offsetTop;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (0 >= distance && distance >= closestDistance) {
      closestHeading = heading;
      closestDistance = distance;
    }
  }

  return closestHeading;
}

const NewBlogPostTocDesktopInner: FunctionComponent<BlogPostTocDesktopInnerProps> = ({ ariaLabel, headings }) => {
  const isLargeScreen = useIsLargeScreen();
  const [currentHeading, setCurrentHeading] = useState<HeadingSlug>('');
  const [isMagnetized, setIsMagnetized] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const scrollDirection = useScrollDirection();
  const observer = useRef<MaybeNull<IntersectionObserver>>(null);
  const visibleElements = useRef<VisibleElements>({});
  const headingsRef = useRef<HTMLOListElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);
  const currentHeadingRef = useRef<HeadingSlug>(currentHeading);
  const isHeadingForcedRef = useRef<boolean>(false);
  const forcedHeadingSlugRef = useRef<HeadingSlug>('');

  const slugAndIndexAssoc = useMemo(() => {
    return headings.reduce(
      (indexed, { slug }, idx) => {
        indexed[slug] = idx;
        return indexed;
      },
      {} as Record<HeadingSlug, HeadingSlugIdx>
    );
  }, [headings]);

  const getFirstVisibleHeadingSlug = useCallback(() => {
    let firstSlug = '';
    let minIndex = NIL_IDX;
    const visibleElementsInstance = getRefCurrentPtr(visibleElements);

    for (const slug of Object.keys(visibleElementsInstance)) {
      const currentIndex = slugAndIndexAssoc[slug];
      if (currentIndex < minIndex || minIndex === NIL_IDX) {
        firstSlug = slug;
        minIndex = currentIndex;
      }
    }

    return firstSlug;
  }, [slugAndIndexAssoc]);

  const handleMagnetization = useCallback(() => {
    const scrollPosition = window.scrollY;

    if (scrollPosition >= MAGNETIZED_NAVBAR_Y_SCROLL_THRESHOLD_IN_PX) {
      setIsMagnetized(true);
    } else {
      setIsMagnetized(false);
      setIsCollapsed(false);
    }
  }, []);

  const handleScrollUp = useCallback(() => {
    if (scrollDirection !== 'up') return;
    if (!isLargeScreen || isHeadingForcedRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const atTop = window.scrollY === 0;
    if (atTop) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const veryFirstHeadingSlug = headings[0].slug;
      setCurrentHeading(veryFirstHeadingSlug);
      return;
    }

    const visibleElementsInstance = getRefCurrentPtr(visibleElements);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (Object.keys(visibleElementsInstance).length === 0) {
      const infered = getClosestUpHeadingFromBottom();
      if (infered) setCurrentHeading(infered.id);
      return;
    }

    const firstVisibleHeadingSlug = getFirstVisibleHeadingSlug();

    if (forcedHeadingSlugRef.current) {
      const newIdx = slugAndIndexAssoc[firstVisibleHeadingSlug];
      const oldIdx = slugAndIndexAssoc[forcedHeadingSlugRef.current];
      if (newIdx <= oldIdx) forcedHeadingSlugRef.current = '';
      else return;
    }

    if (firstVisibleHeadingSlug) setCurrentHeading(firstVisibleHeadingSlug);
  }, [headings, getFirstVisibleHeadingSlug, isLargeScreen, scrollDirection, slugAndIndexAssoc]);

  const handleScrollDown = useCallback(() => {
    if (scrollDirection !== 'down') return;
    if (!isLargeScreen || isHeadingForcedRef.current) return;

    const atBottom = window.scrollY + window.innerHeight === document.documentElement.scrollHeight;
    if (atBottom) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const veryLastHeadingSlug = headings[headings.length - 1].slug;
      setCurrentHeading(veryLastHeadingSlug);
      return;
    }

    const firstVisibleHeadingSlug = getFirstVisibleHeadingSlug();
    if (firstVisibleHeadingSlug) setCurrentHeading(firstVisibleHeadingSlug);
  }, [headings, getFirstVisibleHeadingSlug, isLargeScreen, scrollDirection]);

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

    window.addEventListener('scroll', handleMagnetization);
    window.addEventListener('scroll', handleScrollUp);
    window.addEventListener('scroll', handleScrollDown);

    return () => {
      window.removeEventListener('scroll', handleMagnetization);
      window.removeEventListener('scroll', handleScrollUp);
      window.removeEventListener('scroll', handleScrollDown);
    };
  }, [isLargeScreen, handleScrollDown, handleScrollUp, handleMagnetization]);

  useEffect(() => {
    if (!isLargeScreen) return;

    const handleResize = () => {
      const infered = getClosestUpHeadingFromBottom();
      if (infered) setCurrentHeading(infered.id);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isLargeScreen]);

  useEffect(() => {
    function handleScrollEnd() {
      if (!isLargeScreen) return;
      isHeadingForcedRef.current = false;
    }

    window.addEventListener('scrollend', handleScrollEnd);

    return () => window.removeEventListener('scrollend', handleScrollEnd);
  }, [isLargeScreen]);

  useEffect(() => {
    currentHeadingRef.current = currentHeading;
  }, [currentHeading]);

  useEffect(() => {
    if (!isLargeScreen) return;

    const headingsInstance = getRefCurrentPtr(headingsRef);
    if (!headingsInstance) return;

    const idx = slugAndIndexAssoc[currentHeading];
    if (idx === undefined) return;

    headingsInstance.scrollTo({
      top: (headingsInstance.children[idx] as HTMLElement).offsetTop - TOC_SCROLL_TOP_OFFSET_IN_PX,
      behavior: 'smooth'
    });
  }, [currentHeading, isLargeScreen, slugAndIndexAssoc]);

  useEffect(() => {
    if (!isLargeScreen) return;

    const tocInstance = getRefCurrentPtr(tocRef);
    if (!tocInstance) return;

    function updateScrollOnUncollapse(event: TransitionEvent) {
      const target = event.target as HTMLElement;
      if (target.tagName !== 'NAV') {
        event.stopPropagation();
        return;
      }

      const headingsInstance = getRefCurrentPtr(headingsRef);
      if (!headingsInstance) return;

      const idx = slugAndIndexAssoc[currentHeading];
      if (idx === undefined) return;

      const HTMLElement = headingsInstance.children[idx];
      if (!HTMLElement) return;

      headingsInstance.scrollTo({
        top: (HTMLElement as HTMLElement).offsetTop - TOC_SCROLL_TOP_OFFSET_IN_PX,
        behavior: 'smooth'
      });
    }

    function applyUncollapsedStyles() {
      tocInstance.style.marginTop = '0';
    }

    function applyCollapsedStyles() {
      tocInstance.style.marginTop = '-' + (computeHTMLElementHeight(tocInstance) + COLLAPSE_BUTTON_HEIGTH_IN_PX) + 'px';
    }

    if (!isCollapsed) {
      applyUncollapsedStyles();
      const idx = slugAndIndexAssoc[currentHeading];
      if (idx === undefined) return;

      tocInstance.addEventListener('transitionend', (event) => updateScrollOnUncollapse(event));
      return;
    }

    applyCollapsedStyles();

    return () => tocInstance.removeEventListener('transitionend', updateScrollOnUncollapse);
  }, [isCollapsed, isLargeScreen, currentHeading, slugAndIndexAssoc]);

  useEffect(() => {
    const infered1 = getClosestUpHeadingFromTop();
    if (infered1) {
      setCurrentHeading(infered1.id);
      return;
    }

    const infered2 = getClosestUpHeadingFromBottom();
    if (infered2) {
      setCurrentHeading(infered2.id);
      return;
    }
  }, [getFirstVisibleHeadingSlug, handleMagnetization]);

  useEffect(() => handleMagnetization(), [handleMagnetization]);

  return (
    <nav className="flex flex-col items-center self-start transition-[margin-top] duration-300" aria-label={ariaLabel} ref={tocRef}>
      <ol className="max-h-[40vh] w-full list-none space-y-3 overflow-auto pl-6 rtl:pl-0 rtl:pr-6" ref={headingsRef}>
        {headings.map((heading) => (
          <li
            className={cn('w-fit list-none text-sm font-bold transition-colors duration-200 ease-in-out hover:text-primary', {
              'text-primary': currentHeading === heading.slug,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-6 font-normal': heading.depth === 5,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-2 font-normal': heading.depth === 3,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-4 font-normal': heading.depth === 4
            })}
            key={heading.slug}
          >
            {(!isCollapsed && (
              <Link
                onClick={() => {
                  forcedHeadingSlugRef.current = heading.slug;
                  isHeadingForcedRef.current = true;
                  setCurrentHeading(heading.slug);
                }}
                className={heading.slug === currentHeading ? 'text-primary' : ''}
                href={`#${heading.slug}`}
                replace
              >
                {heading.content}
              </Link>
            )) || (
              <p className="cursor-default select-none" aria-hidden="true">
                {heading.content}
              </p>
            )}
          </li>
        ))}
      </ol>
      {(isMagnetized && (
        <BlogPostTocCollapseButton
          className={cn('relative top-6 z-10 opacity-100 transition-opacity duration-200', { 'top-4': isCollapsed })}
          setIsCollapsed={setIsCollapsed}
          isCollapsed={isCollapsed}
        />
      )) || (
        <BlogPostTocCollapseButton
          className={cn('relative top-6 z-10 opacity-0 transition-opacity duration-200', { 'top-4': isCollapsed })}
          setIsCollapsed={setIsCollapsed}
          isCollapsed={isCollapsed}
          aria-hidden="true"
          isDisabled
        />
      )}
    </nav>
  );
};

export default NewBlogPostTocDesktopInner;

type HeadingSlug = string;
type HeadingSlugIdx = number;
type VisibleElements = Record<HeadingSlug, HeadingSlugIdx>;
