import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { FunctionComponent } from 'react';

import { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import useScrollDirection from '@/components/hooks/useScrollDirection';
import useIsLargeScreen from '@/components/hooks/useIsLargeScreen';
import { computeHTMLElementHeight } from '@rtm/shared-lib/html';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { useRouter } from 'next/navigation';
import { getNavbar } from '@/lib/html';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

import type { BlogPostTocDesktopInnerProps } from '../types';

import BlogPostTocCollapseButton, { COLLAPSE_BUTTON_HEIGTH_IN_PX } from './BlogPostTocCollapseButton';

// https://github.com/argyleink/scrollyfills?tab=readme-ov-file#polyfills
// eslint-disable-next-line import/no-extraneous-dependencies
require('scrollyfills').scrollend;

const navbarElement = getNavbar();
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const navbarHeight = navbarElement ? computeHTMLElementHeight(navbarElement) : 0;
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const BOTTOM_DEAD_ZONE_PX = navbarHeight * 2;
const TOP_DEAD_ZONE_PX = navbarHeight;

const NIL_IDX = -1;
const TOC_SCROLL_TOP_OFFSET_IN_PX: number = 192;

const getAllDocumentHeadingsFromDOM = () => {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const h1 = Array.from(document.querySelectorAll('h1')).slice(1);
  const hN = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'));
  return [...h1, ...hN] as HTMLElement[];
};
const headingsFromDOM = getAllDocumentHeadingsFromDOM();

const getTotalVerticalScrollDistance = () => Math.ceil(window.scrollY + window.innerHeight);

function getClosestUpHeadingFromBottom(): MaybeNull<HTMLElement> {
  let closestHeading = null;
  let closestDistance = Infinity;
  const viewportHeight = window.innerHeight;
  const yStart = window.scrollY + viewportHeight - BOTTOM_DEAD_ZONE_PX;

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
  const [yMin, yMax] = [window.scrollY + TOP_DEAD_ZONE_PX, getTotalVerticalScrollDistance() - BOTTOM_DEAD_ZONE_PX];

  for (const heading of headingsFromDOM) {
    if (heading.offsetTop > yMax) continue;
    const distance = yMin - heading.offsetTop;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (0 >= distance && distance >= closestDistance) {
      closestHeading = heading;
      closestDistance = distance;
    }
  }

  return closestHeading;
}

const BlogPostTocDesktopInner: FunctionComponent<BlogPostTocDesktopInnerProps> = ({ setIsMagnetized, isMagnetized, ariaLabel, headings }) => {
  const router = useRouter();
  const isLargeScreen = useIsLargeScreen();
  const [scrollDirection, setScrollDirection] = useScrollDirection();
  const [currentHeading, setCurrentHeading] = useState<HeadingSlug>('');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const headingsObserver = useRef<MaybeNull<IntersectionObserver>>(null);
  const firstHeadingObserver = useRef<MaybeNull<IntersectionObserver>>(null);
  const visibleHeadings = useRef<VisibleHeadings>({});
  const headingsRef = useRef<HTMLOListElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);
  const forcedHeadingSlugRef = useRef<HeadingSlug>('');
  const muteUpdatesUntilScrollEnd = useRef<boolean>(false);

  const slugAndIndexAssoc = useMemo(() => {
    return headings.reduce(
      (indexed, { slug }, idx) => {
        indexed[slug] = idx;
        return indexed;
      },
      {} as Record<HeadingSlug, HeadingSlugIdx>
    );
  }, [headings]);

  const getCurrentHeadingSlugFromHash: (expectedToBeInViewport?: boolean) => MaybeNull<HeadingSlug> = useCallback(
    (expectedToBeInViewport: boolean = false) => {
      const hash = window.location.hash;
      if (!hash) return null;

      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const maybeHeadingSlug = hash.substring(1);
      const maybeHeadingSlugIdx = slugAndIndexAssoc[maybeHeadingSlug];
      if (maybeHeadingSlugIdx === undefined) return null;

      const heading = document.getElementById(headings[maybeHeadingSlugIdx].slug);
      if (!heading) return null;

      if (!expectedToBeInViewport) return maybeHeadingSlug;

      const [yMin, yMax] = [window.scrollY, getTotalVerticalScrollDistance()];
      const headingIsInViewport = yMax >= heading.offsetTop && heading.offsetTop >= yMin;
      return !headingIsInViewport ? null : maybeHeadingSlug;
    },
    [slugAndIndexAssoc, headings]
  );

  const inferCurrentHeadingRegardlessIntersectionObserver: () => MaybeNull<HTMLElement> = useCallback(() => {
    const infered1 = getClosestUpHeadingFromTop();

    if (infered1) {
      const inferedElementHeading = infered1.id;
      const inferedElementYTopInViewport = infered1.getBoundingClientRect().top;
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const midViewportHeight = window.innerHeight / 2;
      if (midViewportHeight < inferedElementYTopInViewport) {
        const idx = slugAndIndexAssoc[inferedElementHeading];
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if (idx === 0) {
          setCurrentHeading(inferedElementHeading);
          return infered1;
        }
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const rescueHeading = headings[idx - 1].slug;
        forcedHeadingSlugRef.current = rescueHeading;
        setScrollDirection('up');
        setCurrentHeading(rescueHeading);
        const infered3 = document.getElementById(rescueHeading);
        return infered3;
      }
      setCurrentHeading(inferedElementHeading);
      return infered1;
    }

    const infered2 = getClosestUpHeadingFromBottom();
    if (!infered2) return null;

    setCurrentHeading(infered2.id);
    return infered2;
  }, [headings, slugAndIndexAssoc, setScrollDirection]);

  const getFirstVisibleHeadingSlug = useCallback(() => {
    let firstSlug: MaybeNull<HeadingSlug> = null;
    let minIndex = NIL_IDX;
    const visibleHeadingsInstance = getRefCurrentPtr(visibleHeadings);

    for (const slug of Object.keys(visibleHeadingsInstance)) {
      const currentIndex = slugAndIndexAssoc[slug];
      if (currentIndex < minIndex || minIndex === NIL_IDX) {
        firstSlug = slug;
        minIndex = currentIndex;
      }
    }

    return firstSlug;
  }, [slugAndIndexAssoc]);

  const handleScrollUp = useCallback(() => {
    if (scrollDirection !== 'up' || !isLargeScreen || muteUpdatesUntilScrollEnd.current) return;

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const atTop = window.scrollY === 0;
    if (atTop) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const veryFirstHeadingSlug = headings[0].slug;
      forcedHeadingSlugRef.current = '';
      setCurrentHeading(veryFirstHeadingSlug);
      return;
    }

    const visibleHeadingsInstance = getRefCurrentPtr(visibleHeadings);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (Object.keys(visibleHeadingsInstance).length === 0) {
      const infered = getClosestUpHeadingFromBottom();
      if (!infered) return;

      const inferedHeading = infered.id;

      if (forcedHeadingSlugRef.current) {
        const inferedHeadingIdx = slugAndIndexAssoc[inferedHeading];
        const forcedHeadingIdx = slugAndIndexAssoc[forcedHeadingSlugRef.current];
        if (inferedHeadingIdx <= forcedHeadingIdx) forcedHeadingSlugRef.current = '';
        else return;
      }

      setCurrentHeading(inferedHeading);
      return;
    }

    const firstVisibleHeadingSlug = getFirstVisibleHeadingSlug();
    if (firstVisibleHeadingSlug === null) return;

    if (forcedHeadingSlugRef.current) {
      const newIdx = slugAndIndexAssoc[firstVisibleHeadingSlug];
      const oldIdx = slugAndIndexAssoc[forcedHeadingSlugRef.current];
      if (newIdx <= oldIdx) forcedHeadingSlugRef.current = '';
      else return;
    }

    setCurrentHeading(firstVisibleHeadingSlug);
  }, [headings, getFirstVisibleHeadingSlug, isLargeScreen, scrollDirection, slugAndIndexAssoc]);

  const handleScrollDown = useCallback(() => {
    if (scrollDirection !== 'down' || !isLargeScreen || muteUpdatesUntilScrollEnd.current) return;

    const atBottom = getTotalVerticalScrollDistance() >= document.documentElement.scrollHeight;
    if (atBottom) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const veryLastHeadingSlug = headings[headings.length - 1].slug;
      forcedHeadingSlugRef.current = '';
      setCurrentHeading(veryLastHeadingSlug);
      return;
    }

    const firstVisibleHeadingSlug = getFirstVisibleHeadingSlug();
    if (firstVisibleHeadingSlug === null) return;

    if (forcedHeadingSlugRef.current) {
      const newIdx = slugAndIndexAssoc[firstVisibleHeadingSlug];
      const oldIdx = slugAndIndexAssoc[forcedHeadingSlugRef.current];
      if (newIdx >= oldIdx) forcedHeadingSlugRef.current = '';
      else return;
    }

    setCurrentHeading(firstVisibleHeadingSlug);
  }, [headings, getFirstVisibleHeadingSlug, isLargeScreen, scrollDirection, slugAndIndexAssoc]);

  const handleMagnetization = useCallback(() => {
    if (!isLargeScreen) return;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const firstHeading = document.getElementById(headings[0].slug);
    if (!firstHeading) return;

    firstHeadingObserver.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setIsMagnetized(!entry.isIntersecting);
      },
      {
        rootMargin: `-${TOP_DEAD_ZONE_PX}px 0px -${BOTTOM_DEAD_ZONE_PX}px 0px`,
        threshold: 1
      }
    );

    const firstHeadingObserverInstance = getRefCurrentPtr(firstHeadingObserver);

    firstHeadingObserverInstance.observe(firstHeading);

    return () => {
      if (firstHeadingObserverInstance) firstHeadingObserverInstance.disconnect();
    };
  }, [headings, isLargeScreen, setIsMagnetized]);

  useEffect(() => {
    function handleScrollEnd() {
      if (!isLargeScreen) return;
      muteUpdatesUntilScrollEnd.current = false;
    }

    window.addEventListener('scrollend', handleScrollEnd);

    return () => window.removeEventListener('scrollend', handleScrollEnd);
  }, [isLargeScreen]);

  useEffect(() => {
    if (!isLargeScreen) return;

    const visibleHeadingsInstance = getRefCurrentPtr(visibleHeadings);

    headingsObserver.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const slug = entry.target.id;
          if (entry.isIntersecting) {
            visibleHeadingsInstance[slug] = slugAndIndexAssoc[slug];
          } else {
            delete visibleHeadingsInstance[slug];
          }
        }
      },
      {
        rootMargin: `-${TOP_DEAD_ZONE_PX}px 0px -${BOTTOM_DEAD_ZONE_PX}px 0px`,
        threshold: 0.1
      }
    );

    const headingsObserverInstance = getRefCurrentPtr(headingsObserver);

    for (const heading of headings) {
      const element: MaybeNull<HTMLElement> = document.getElementById(heading.slug);
      if (element) headingsObserverInstance.observe(element);
    }

    return () => {
      if (headingsObserverInstance) headingsObserverInstance.disconnect();
    };
  }, [headings, isLargeScreen, slugAndIndexAssoc, handleMagnetization]);

  useEffect(() => {
    if (!isMagnetized) setIsCollapsed(false);
  }, [isMagnetized]);

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

  useEffect(
    () => {
      if (!isLargeScreen) return;

      const tocInstance = getRefCurrentPtr(tocRef);
      if (!tocInstance) return;

      function updateScrollOnUncollapse(event: TransitionEvent) {
        const target = event.target as HTMLElement;
        if (target.tagName !== 'NAV') return;

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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isCollapsed]
  );

  useEffect(
    () => {
      const maybeHeadingSlugFromHash = getCurrentHeadingSlugFromHash(true);
      if (maybeHeadingSlugFromHash) setCurrentHeading(maybeHeadingSlugFromHash);
      else inferCurrentHeadingRegardlessIntersectionObserver();
      handleMagnetization();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (!isLargeScreen) return;

    const handleResize = () => {
      inferCurrentHeadingRegardlessIntersectionObserver();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isLargeScreen, inferCurrentHeadingRegardlessIntersectionObserver]);

  useEffect(() => {
    if (!isLargeScreen) return;

    const handleHashchange = () => {
      const heading = getCurrentHeadingSlugFromHash();
      if (heading !== null) {
        forcedHeadingSlugRef.current = heading;
        setCurrentHeading(heading);
      }
    };

    window.addEventListener('hashchange', handleHashchange);

    return () => {
      window.removeEventListener('hashchange', handleHashchange);
    };
  }, [isLargeScreen, getCurrentHeadingSlugFromHash]);

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

  return (
    <nav className="flex flex-col items-center self-start transition-[margin-top] duration-300" aria-label={ariaLabel} ref={tocRef}>
      <ol className="max-h-[40vh] w-full list-none space-y-3 overflow-auto pl-6 rtl:pl-0 rtl:pr-6" ref={headingsRef}>
        {headings.map((heading) => (
          <li
            className={cn('w-fit list-none text-sm font-bold transition-colors duration-200 ease-in-out hover:text-primary focus:text-primary', {
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
                onClick={(event) => {
                  event.preventDefault();
                  const elem = document.getElementById(heading.slug);
                  if (!elem) return;
                  forcedHeadingSlugRef.current = heading.slug;
                  muteUpdatesUntilScrollEnd.current = true;
                  router.replace('#' + heading.slug, { scroll: false });
                  setCurrentHeading(forcedHeadingSlugRef.current);
                  window.scrollTo({ top: elem.offsetTop - TOC_SCROLL_TOP_OFFSET_IN_PX, behavior: 'instant' });
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
      {
        <BlogPostTocCollapseButton
          className={cn('relative top-6 z-10 opacity-100 transition-opacity duration-200', {
            'opacity-0': !isMagnetized,
            'top-4': isCollapsed
          })}
          setIsCollapsed={setIsCollapsed}
          aria-hidden={!isMagnetized}
          isDisabled={!isMagnetized}
          isCollapsed={isCollapsed}
        />
      }
    </nav>
  );
};

export default BlogPostTocDesktopInner;

type HeadingSlug = string;
type HeadingSlugIdx = number;
type VisibleHeadings = Record<HeadingSlug, HeadingSlugIdx>;
