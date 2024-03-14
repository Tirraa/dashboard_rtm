import type { MaybeUndefined, MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { FunctionComponent } from 'react';

import { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import useScrollDirection from '@/components/hooks/useScrollDirection';
import useIsLargeScreen from '@/components/hooks/useIsLargeScreen';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { useRouter } from 'next/navigation';
import { getNavbar } from '@/lib/html';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

import type { BlogPostTocDesktopInnerProps } from '../types';

import BlogPostTocCollapseButton, { COLLAPSE_BUTTON_HEIGTH_IN_PX } from './BlogPostTocCollapseButton';

// {ToDo} Remove this if, one day, this bug is fixed: https://bugs.webkit.org/show_bug.cgi?id=201556
// https://github.com/argyleink/scrollyfills?tab=readme-ov-file#polyfills
// eslint-disable-next-line import/no-extraneous-dependencies
require('scrollyfills').scrollend;

const navbarElement: MaybeNull<HTMLElement> = getNavbar();
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const navbarHeight: number = navbarElement ? navbarElement.getBoundingClientRect().height : 0;
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const BOTTOM_DEAD_ZONE_PX: number = navbarHeight * 2;
const TOP_DEAD_ZONE_PX: number = navbarHeight;

const NIL_IDX: number = -1;
const TOC_SCROLL_TOP_OFFSET_IN_PX: number = 172;

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const isAtTop = () => window.scrollY === 0;

const getTotalVerticalScrollDistance = () => Math.ceil(window.scrollY + window.innerHeight);

const getAllDocumentHeadingsFromDOM = () => {
  const h1 = Array.from(document.querySelectorAll('h1'));
  const hN = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'));
  return [...h1, ...hN] as HTMLElement[];
};

const BlogPostTocDesktopInner: FunctionComponent<BlogPostTocDesktopInnerProps> = ({
  setIsMagnetized,
  setIsCollapsed,
  isMagnetized,
  isCollapsed,
  ariaLabel,
  headings
}) => {
  const router = useRouter();
  const isLargeScreen = useIsLargeScreen();
  const [scrollDirection, setScrollDirection] = useScrollDirection();
  const [currentHeading, setCurrentHeading] = useState<HeadingSlug>('');

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

  const headingsFromDOM = useMemo(
    () => getAllDocumentHeadingsFromDOM().filter((heading) => heading.id && slugAndIndexAssoc[heading.id] !== undefined),
    [slugAndIndexAssoc]
  );

  const releaseOldHeadingFocus = useCallback(() => {
    const headingsRefInstance = getRefCurrentPtr(headingsRef);
    const maybeCurrentlyFocusedHeadingParent = Array.from(headingsRefInstance.children).find((headingLi) =>
      Array.from(headingLi.children).find((child) => child === document.activeElement)
    ) as MaybeUndefined<Element>;

    if (!maybeCurrentlyFocusedHeadingParent) return;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const maybeCurrentlyFocusedHeading = maybeCurrentlyFocusedHeadingParent.children[0] as MaybeUndefined<HTMLElement>;
    if (maybeCurrentlyFocusedHeading) maybeCurrentlyFocusedHeading.blur();
  }, []);

  const releaseOldHeadingFocusAndSetCurrentHeading = useCallback(
    (newCurrentHeading: HeadingSlug) => {
      releaseOldHeadingFocus();
      setCurrentHeading(newCurrentHeading);
    },
    [releaseOldHeadingFocus]
  );

  const getClosestUpHeadingFromBottom = useCallback((): MaybeNull<HTMLElement> => {
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
  }, [headingsFromDOM]);

  const getClosestUpHeadingFromTop = useCallback((): MaybeNull<HTMLElement> => {
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
  }, [headingsFromDOM]);

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

  /**
   * @effect {May tweak Scroll Direction state and set a forced heading}
   */
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
        if (idx === 0) return infered1;
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const rescueHeading = headings[idx - 1].slug;
        forcedHeadingSlugRef.current = rescueHeading;
        setScrollDirection('up');
        const infered3 = document.getElementById(rescueHeading);
        return infered3;
      }
      return infered1;
    }

    const infered2 = getClosestUpHeadingFromBottom();
    if (!infered2) return null;

    releaseOldHeadingFocusAndSetCurrentHeading(infered2.id);
    return infered2;
  }, [
    headings,
    slugAndIndexAssoc,
    setScrollDirection,
    getClosestUpHeadingFromBottom,
    getClosestUpHeadingFromTop,
    releaseOldHeadingFocusAndSetCurrentHeading
  ]);

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

  /**
   * @effect {May tweak Current Heading state & reset forced heading}
   */
  const handleScrollUp = useCallback(() => {
    if (scrollDirection !== 'up' || !isLargeScreen || muteUpdatesUntilScrollEnd.current) return;

    if (isAtTop()) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const veryFirstHeadingSlug = headings[0].slug;
      forcedHeadingSlugRef.current = '';
      releaseOldHeadingFocusAndSetCurrentHeading(veryFirstHeadingSlug);
      return;
    }

    const visibleHeadingsInstance = getRefCurrentPtr(visibleHeadings);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (Object.keys(visibleHeadingsInstance).length === 0) {
      const infered = getClosestUpHeadingFromBottom();
      if (!infered) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const veryFirstHeadingSlug = headings[0].slug;
        releaseOldHeadingFocusAndSetCurrentHeading(veryFirstHeadingSlug);
        return;
      }

      const inferedHeading = infered.id;

      if (forcedHeadingSlugRef.current) {
        const inferedHeadingIdx = slugAndIndexAssoc[inferedHeading];
        const forcedHeadingIdx = slugAndIndexAssoc[forcedHeadingSlugRef.current];
        if (inferedHeadingIdx <= forcedHeadingIdx) forcedHeadingSlugRef.current = '';
        else return;
      }

      releaseOldHeadingFocusAndSetCurrentHeading(inferedHeading);
      return;
    }

    let firstVisibleHeadingSlug = getFirstVisibleHeadingSlug();
    if (firstVisibleHeadingSlug === null) {
      const rescueHeading = inferCurrentHeadingRegardlessIntersectionObserver();
      if (rescueHeading) firstVisibleHeadingSlug = rescueHeading.id;
      else return;
    }

    if (forcedHeadingSlugRef.current) {
      const newIdx = slugAndIndexAssoc[firstVisibleHeadingSlug];
      const oldIdx = slugAndIndexAssoc[forcedHeadingSlugRef.current];
      if (newIdx <= oldIdx) forcedHeadingSlugRef.current = '';
      else return;
    }

    releaseOldHeadingFocusAndSetCurrentHeading(firstVisibleHeadingSlug);
  }, [
    headings,
    getFirstVisibleHeadingSlug,
    isLargeScreen,
    scrollDirection,
    slugAndIndexAssoc,
    inferCurrentHeadingRegardlessIntersectionObserver,
    getClosestUpHeadingFromBottom,
    releaseOldHeadingFocusAndSetCurrentHeading
  ]);

  const isAtBottom = useCallback(() => getTotalVerticalScrollDistance() >= document.documentElement.scrollHeight, []);

  /**
   * @effect {May tweak Current Heading state & reset forced heading}
   */
  const handleScrollDown = useCallback(() => {
    if (scrollDirection !== 'down' || !isLargeScreen || muteUpdatesUntilScrollEnd.current) return;

    if (isAtBottom()) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const veryLastHeadingSlug = headings[headings.length - 1].slug;
      forcedHeadingSlugRef.current = '';
      releaseOldHeadingFocusAndSetCurrentHeading(veryLastHeadingSlug);
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

    releaseOldHeadingFocusAndSetCurrentHeading(firstVisibleHeadingSlug);
  }, [
    headings,
    getFirstVisibleHeadingSlug,
    isLargeScreen,
    scrollDirection,
    slugAndIndexAssoc,
    isAtBottom,
    releaseOldHeadingFocusAndSetCurrentHeading
  ]);

  /**
   * @effect {Tweaks isMagnetized state}
   */
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

  /**
   * @effect {Listen scrollend event to unmute updates}
   */
  useEffect(() => {
    function handleScrollEnd() {
      if (!isLargeScreen) return;
      muteUpdatesUntilScrollEnd.current = false;
    }

    window.addEventListener('scrollend', handleScrollEnd);

    return () => window.removeEventListener('scrollend', handleScrollEnd);
  }, [isLargeScreen]);

  /**
   * @effect {Mutates visibleHeadings ref}
   */
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

  /**
   * @effect {Tweaks isCollapsed state, depending on isMagnetized state}
   */
  useEffect(() => {
    if (!isMagnetized) setIsCollapsed(false);
  }, [isMagnetized, setIsCollapsed]);

  /**
   * @effect {ToC autoscroll}
   */
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
    return;
  }, [currentHeading, isLargeScreen, slugAndIndexAssoc, headings]);

  /**
   * @effect {ToC autoscroll on uncollapse}
   */
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

        tocInstance.removeEventListener('transitionend', (event) => updateScrollOnUncollapse(event));
      }

      function applyUncollapsedStyles() {
        tocInstance.style.marginTop = '0';
      }

      function applyCollapsedStyles() {
        const height = tocInstance.getBoundingClientRect().height;
        tocInstance.style.marginTop = '-' + (height + COLLAPSE_BUTTON_HEIGTH_IN_PX) + 'px';
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

  /**
   * @effect {Resize Listener, may tweak Current Heading state}
   */
  useEffect(() => {
    if (!isLargeScreen) return;

    const handleResize = () => {
      const maybeInferedHeading = inferCurrentHeadingRegardlessIntersectionObserver();
      if (maybeInferedHeading) releaseOldHeadingFocusAndSetCurrentHeading(maybeInferedHeading.id);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isLargeScreen, inferCurrentHeadingRegardlessIntersectionObserver, releaseOldHeadingFocusAndSetCurrentHeading]);

  /**
   * @effect {Hash change Listener, may tweak Current Heading state}
   */
  useEffect(() => {
    if (!isLargeScreen) return;

    const handleHashchange = () => {
      const heading = getCurrentHeadingSlugFromHash();
      if (heading !== null) {
        forcedHeadingSlugRef.current = heading;
        releaseOldHeadingFocusAndSetCurrentHeading(heading);
      }
    };

    window.addEventListener('hashchange', handleHashchange);

    return () => {
      window.removeEventListener('hashchange', handleHashchange);
    };
  }, [isLargeScreen, getCurrentHeadingSlugFromHash, releaseOldHeadingFocusAndSetCurrentHeading]);

  /**
   * @effect {Scroll listeners checkpoint}
   */
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

  /**
   * @effect {Initializer}
   */
  useEffect(
    () => {
      const maybeHeadingSlugFromHash = getCurrentHeadingSlugFromHash(true);
      if (maybeHeadingSlugFromHash) releaseOldHeadingFocusAndSetCurrentHeading(maybeHeadingSlugFromHash);
      else {
        const maybeInferedHeading = inferCurrentHeadingRegardlessIntersectionObserver();
        if (maybeInferedHeading) releaseOldHeadingFocusAndSetCurrentHeading(maybeInferedHeading.id);
      }
      handleMagnetization();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <nav className="flex flex-col items-center self-start transition-[margin-top] duration-300" aria-label={ariaLabel} ref={tocRef}>
      <ol className="mb-1 max-h-[354px] w-full list-none space-y-3 overflow-auto px-4" ref={headingsRef}>
        {headings.map((heading) => (
          <li
            className={cn('w-fit list-none text-sm font-bold text-white transition-all duration-200 ease-in-out', {
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'mt-2': heading.slug === currentHeading && slugAndIndexAssoc[heading.slug] === 0,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'font-medium': 3 <= heading.depth && heading.depth <= 6,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-6': heading.depth === 5,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-2': heading.depth === 3,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-4': heading.depth === 4
            })}
            key={heading.slug}
          >
            {(!isCollapsed && (
              <Link
                onClick={(event) => {
                  event.preventDefault();
                  const { slug } = heading;
                  const elem = document.getElementById(slug);
                  if (!elem) return;

                  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                  if (slug === headings[headings.length - 1].slug && isAtBottom()) {
                    router.replace('#' + slug, { scroll: false });
                    setCurrentHeading(slug);
                    forcedHeadingSlugRef.current = '';
                    return;
                  }

                  forcedHeadingSlugRef.current = slug;
                  muteUpdatesUntilScrollEnd.current = true;
                  router.replace('#' + slug, { scroll: false });
                  setCurrentHeading(forcedHeadingSlugRef.current);
                  const scrollYStart = window.scrollY;
                  let scrollYTarget = elem.offsetTop - TOC_SCROLL_TOP_OFFSET_IN_PX;

                  if (Math.ceil(scrollYTarget + window.innerHeight) >= document.documentElement.scrollHeight) {
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    scrollYTarget = Math.trunc(document.documentElement.scrollHeight) - Math.trunc(window.innerHeight) - 2;
                  }

                  window.scrollTo({ behavior: 'instant', top: scrollYTarget });
                  const scrollYEnd = window.scrollY;

                  if (Math.trunc(scrollYStart) === Math.trunc(scrollYEnd)) window.dispatchEvent(new Event('scrollend'));
                }}
                className={cn('block transition-all', {
                  'rounded-md bg-primary p-1 font-bold': heading.slug === currentHeading,
                  'hover:underline focus:text-primary': heading.slug !== currentHeading,
                  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                  'p-1': slugAndIndexAssoc[heading.slug] === headings.length - 1
                })}
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
