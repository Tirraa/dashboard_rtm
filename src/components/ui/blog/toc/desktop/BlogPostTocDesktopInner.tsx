import type { MaybeUndefined, MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { DocumentHeading } from '@rtm/shared-types/Documents';
import type { PxValue, Index } from '@rtm/shared-types/Numbers';
import type { FunctionComponent } from 'react';

import { APPROX_120_FPS_THROTTLE_TIMING_IN_MS } from '@/config/throttling';
import { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import useScrollDirection from '@/components/hooks/useScrollDirection';
import useIsLargeScreen from '@/components/hooks/useIsLargeScreen';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import ELEMENTS_ID from '@/config/elementsId';
import { useRouter } from 'next/navigation';
import { getNavbar } from '@/lib/html';
import { cn } from '@/lib/tailwind';
import throttle from 'throttleit';
import Link from 'next/link';

import type { BlogPostTocDesktopInnerProps } from '../types';

import BlogPostTocCollapseButton, { COLLAPSE_BUTTON_HEIGTH_IN_PX } from './BlogPostTocCollapseButton';

// {ToDo} Remove this if, one day, this bug is fixed: https://bugs.webkit.org/show_bug.cgi?id=201556
// https://github.com/argyleink/scrollyfills?tab=readme-ov-file#polyfills
// eslint-disable-next-line import/no-extraneous-dependencies
require('scrollyfills').scrollend;

const navbarElement: MaybeNull<HTMLElement> = getNavbar();
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const navbarHeight: PxValue = navbarElement ? navbarElement.getBoundingClientRect().height : 0;
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const BOTTOM_DEAD_ZONE_PX: PxValue = navbarHeight * 2;
const TOP_DEAD_ZONE_PX: PxValue = navbarHeight;

const SCROLL_TOP_OFFSET_ONCLICK_MAGIC: PxValue = navbarHeight;

const TOC_SCROLL_TOP_OFFSET_IN_PX: PxValue = 172;

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const isAtTop = () => window.scrollY === 0;

const getTotalVerticalScrollDistance = () => Math.ceil(window.scrollY + window.innerHeight);

const getAllDocumentHeadingsFromDOM = () => Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')) as HTMLElement[];

const getMdxBodyFromDOM = () => document.getElementById(ELEMENTS_ID.MDX_BODY);

// {ToDo} https://github.com/Tirraa/dashboard_rtm/issues/126
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

  const lastScrollY = useRef<PxValue>(window.scrollY);
  const headingsRef = useRef<HTMLOListElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);
  const forcedHeadingSlugRef = useRef<HeadingSlug>('');
  const muteUpdatesUntilScrollEnd = useRef<boolean>(false);
  const muteScrollEndNextDoubleCheck = useRef<boolean>(false);

  const handleScrollUpRef = useRef<MaybeNull<(currentScrollY: PxValue, oldScrollY: PxValue, forced?: boolean) => void>>(null);
  const handleScrollDownRef = useRef<MaybeNull<(currentScrollY: PxValue, oldScrollY: PxValue, forced?: boolean) => void>>(null);

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

  const mdxBodyFromDOM = useMemo(() => getMdxBodyFromDOM(), []);

  const dropOldHeadingFocus = useCallback(() => {
    const headingsRefInstance = getRefCurrentPtr(headingsRef);
    if (!headingsRefInstance) return;

    const maybeCurrentlyFocusedHeadingParent: MaybeUndefined<Element> = Array.from(headingsRefInstance.children).find((headingLi) =>
      Array.from(headingLi.children).find((child) => child === document.activeElement)
    );

    if (!maybeCurrentlyFocusedHeadingParent) return;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const maybeCurrentlyFocusedHeading = maybeCurrentlyFocusedHeadingParent.children[0] as MaybeUndefined<HTMLElement>;
    if (maybeCurrentlyFocusedHeading) maybeCurrentlyFocusedHeading.blur();
  }, []);

  const dropOldHeadingFocusAndSetCurrentHeading = useCallback(
    (newCurrentHeading: HeadingSlug) => {
      dropOldHeadingFocus();
      setCurrentHeading(newCurrentHeading);
    },
    [dropOldHeadingFocus]
  );

  const getClosestHeadingFromBottom = useCallback((): MaybeNull<HTMLElement> => {
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

  const getClosestHeadingFromTop = useCallback((): MaybeNull<HTMLElement> => {
    let closestHeading = null;
    let closestDistance = -Infinity; // Like the level of the Intersection Observer devs
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

  const inferCurrentHeading: () => MaybeNull<HTMLElement> = useCallback(() => {
    const infered1 = getClosestHeadingFromTop();

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
        forcedHeadingSlugRef.current = '';
        muteUpdatesUntilScrollEnd.current = true;
        setScrollDirection('up');
        const infered3 = document.getElementById(rescueHeading);
        return infered3;
      }
      return infered1;
    }

    const infered2 = getClosestHeadingFromBottom();
    if (!infered2) return null;

    dropOldHeadingFocusAndSetCurrentHeading(infered2.id);
    return infered2;
  }, [
    headings,
    slugAndIndexAssoc,
    setScrollDirection,
    getClosestHeadingFromBottom,
    getClosestHeadingFromTop,
    dropOldHeadingFocusAndSetCurrentHeading
  ]);

  const isAtBottom = useCallback(() => getTotalVerticalScrollDistance() >= document.documentElement.scrollHeight, []);

  const populateHandleScrollUpAndHandleScrollDown = useCallback(() => {
    handleScrollUpRef.current = (currentScrollY: PxValue, oldScrollY: PxValue, forced: boolean = false) => {
      if (!isLargeScreen || muteScrollEndNextDoubleCheck.current) return;

      if (currentScrollY > oldScrollY) {
        setScrollDirection('down');
        const handleScrollDownInstance = getRefCurrentPtr(handleScrollDownRef);
        if (handleScrollDownInstance) handleScrollDownInstance(currentScrollY, oldScrollY, true);
        return;
      }

      const isForced = Boolean(forced);
      let skip = false;

      if (isForced) skip = false;
      else if (scrollDirection !== 'up' || muteUpdatesUntilScrollEnd.current) skip = true;

      if (skip) return;

      if (isAtTop()) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const veryFirstHeadingSlug = headings[0].slug;
        forcedHeadingSlugRef.current = '';
        dropOldHeadingFocusAndSetCurrentHeading(veryFirstHeadingSlug);
        return;
      }

      const infered: MaybeNull<HeadingSlug> = getClosestHeadingFromTop()?.id ?? null;

      if (!infered) {
        const maybeRescueHeading: MaybeNull<HeadingSlug> = inferCurrentHeading()?.id ?? null;
        if (maybeRescueHeading) {
          dropOldHeadingFocusAndSetCurrentHeading(maybeRescueHeading);
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const veryFirstHeadingSlug = headings[0].slug;
        dropOldHeadingFocusAndSetCurrentHeading(veryFirstHeadingSlug);
        return;
      }

      if (forcedHeadingSlugRef.current) {
        const inferedHeadingIdx = slugAndIndexAssoc[infered];
        const forcedHeadingIdx = slugAndIndexAssoc[forcedHeadingSlugRef.current];
        if (inferedHeadingIdx <= forcedHeadingIdx) forcedHeadingSlugRef.current = '';
        else return;
      }

      dropOldHeadingFocusAndSetCurrentHeading(infered);
      return;
    };

    handleScrollDownRef.current = (currentScrollY: PxValue, oldScrollY: PxValue, forced: boolean = false) => {
      if (!isLargeScreen || muteScrollEndNextDoubleCheck.current) return;

      if (currentScrollY < oldScrollY) {
        setScrollDirection('up');
        const handleScrollUpInstance = getRefCurrentPtr(handleScrollUpRef);
        if (handleScrollUpInstance) handleScrollUpInstance(currentScrollY, oldScrollY, true);
        return;
      }

      const isForced = Boolean(forced);
      let skip = false;

      if (isForced) skip = false;
      else if (scrollDirection !== 'down' || muteUpdatesUntilScrollEnd.current) skip = true;

      if (skip) return;

      if (isAtBottom()) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const veryLastHeadingSlug = headings[headings.length - 1].slug;
        forcedHeadingSlugRef.current = '';
        dropOldHeadingFocusAndSetCurrentHeading(veryLastHeadingSlug);
        return;
      }

      let firstVisibleHeadingSlug: MaybeNull<HeadingSlug> = getClosestHeadingFromTop()?.id ?? null;
      if (firstVisibleHeadingSlug === null) {
        const rescueHeading: MaybeNull<HeadingSlug> = inferCurrentHeading()?.id ?? null;
        if (rescueHeading) firstVisibleHeadingSlug = rescueHeading;
        else return;
      }

      if (forcedHeadingSlugRef.current) {
        const newIdx = slugAndIndexAssoc[firstVisibleHeadingSlug];
        const oldIdx = slugAndIndexAssoc[forcedHeadingSlugRef.current];
        if (newIdx >= oldIdx) forcedHeadingSlugRef.current = '';
        else return;
      }

      dropOldHeadingFocusAndSetCurrentHeading(firstVisibleHeadingSlug);
    };
  }, [
    getClosestHeadingFromTop,
    headings,
    inferCurrentHeading,
    isAtBottom,
    isLargeScreen,
    dropOldHeadingFocusAndSetCurrentHeading,
    scrollDirection,
    setScrollDirection,
    slugAndIndexAssoc
  ]);

  const handleMagnetization = useCallback(() => {
    if (!isLargeScreen || !mdxBodyFromDOM?.offsetTop) return;

    setIsMagnetized(window.scrollY + navbarHeight >= mdxBodyFromDOM.offsetTop);
  }, [isLargeScreen, mdxBodyFromDOM, setIsMagnetized]);

  const onClickMagic = useCallback(
    (event: Pick<Event, 'preventDefault'>, heading: DocumentHeading) => {
      event.preventDefault();

      const { slug } = heading;
      const elem = document.getElementById(slug);
      if (!elem) return;

      forcedHeadingSlugRef.current = slug;

      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const isLastHeading = slug === headings[headings.length - 1].slug;

      if (isLastHeading && isAtBottom()) {
        setCurrentHeading(slug);
        router.replace('#' + slug, { scroll: false });
        return;
      }

      muteUpdatesUntilScrollEnd.current = true;
      muteScrollEndNextDoubleCheck.current = true;
      const scrollYTarget = Math.min(
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        Math.trunc(document.documentElement.scrollHeight) - Math.trunc(window.innerHeight) - 2,
        elem.offsetTop - SCROLL_TOP_OFFSET_ONCLICK_MAGIC
      );

      forcedHeadingSlugRef.current = slug;

      if (Math.trunc(scrollYTarget) === Math.trunc(window.scrollY)) window.dispatchEvent(new Event('scrollend'));
      else window.scrollTo({ behavior: 'instant', top: scrollYTarget });

      setCurrentHeading(slug);
      router.replace('#' + slug, { scroll: false });
    },
    [headings, isAtBottom, router]
  );

  const handleMagicHeadingClick = useCallback(
    (event: Event) => {
      if (!event.target) return;

      const anchorElement = (event.target as HTMLElement).closest('a');

      if (anchorElement?.parentNode) {
        onClickMagic(event, headings[slugAndIndexAssoc[(anchorElement.parentNode as HTMLElement).id]]);
      }
    },
    [headings, onClickMagic, slugAndIndexAssoc]
  );

  const setDocumentHeadingsOnClickEvent = useCallback(
    (doSet: boolean = true) => {
      for (const heading of headingsFromDOM) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const firstChild = heading.children[0];
        if (!firstChild) continue;

        firstChild.removeEventListener('click', handleMagicHeadingClick);
        if (doSet) firstChild.addEventListener('click', handleMagicHeadingClick);
      }
    },
    [headingsFromDOM, handleMagicHeadingClick]
  );

  useEffect(() => {
    function handleScrollEnd() {
      const currentScrollY = window.scrollY;
      const oldScrollY = lastScrollY.current;
      lastScrollY.current = currentScrollY;

      if (!isLargeScreen) return;

      muteUpdatesUntilScrollEnd.current = false;
      if (muteScrollEndNextDoubleCheck.current) {
        muteScrollEndNextDoubleCheck.current = false;
        return;
      }

      if (scrollDirection === 'up') {
        const handleScrollUpInstance = getRefCurrentPtr(handleScrollUpRef);
        if (handleScrollUpInstance) handleScrollUpInstance(currentScrollY, oldScrollY, true);
        return;
      }

      if (scrollDirection !== 'down') return;

      const handleScrollDownInstance = getRefCurrentPtr(handleScrollDownRef);
      if (handleScrollDownInstance) handleScrollDownInstance(currentScrollY, oldScrollY, true);
    }

    window.addEventListener('scrollend', handleScrollEnd);

    return () => window.removeEventListener('scrollend', handleScrollEnd);
  }, [isLargeScreen, scrollDirection]);

  useEffect(() => {
    if (!isMagnetized) setIsCollapsed(false);
  }, [isMagnetized, setIsCollapsed]);

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

  useEffect(() => {
    if (!isLargeScreen) return;

    const handleResize = () => {
      const maybeInferedHeading = inferCurrentHeading();
      if (maybeInferedHeading) {
        dropOldHeadingFocusAndSetCurrentHeading(maybeInferedHeading.id);
      }
    };

    const throttledResizeHandler = throttle(handleResize, APPROX_120_FPS_THROTTLE_TIMING_IN_MS);

    window.addEventListener('resize', throttledResizeHandler);

    return () => {
      window.removeEventListener('resize', throttledResizeHandler);
    };
  }, [isLargeScreen, inferCurrentHeading, dropOldHeadingFocusAndSetCurrentHeading]);

  useEffect(() => {
    if (!isLargeScreen) return;

    const handleHashchange = () => {
      const heading = getCurrentHeadingSlugFromHash();
      if (heading !== null) {
        forcedHeadingSlugRef.current = heading;
        dropOldHeadingFocusAndSetCurrentHeading(heading);
      }
    };

    window.addEventListener('hashchange', handleHashchange);

    return () => {
      window.removeEventListener('hashchange', handleHashchange);
    };
  }, [isLargeScreen, getCurrentHeadingSlugFromHash, dropOldHeadingFocusAndSetCurrentHeading]);

  useEffect(() => {
    if (!isLargeScreen) return;

    function handleScrollUp(currentScrollY: PxValue, oldScrollY: PxValue) {
      const handleScrollUpInstance = getRefCurrentPtr(handleScrollUpRef);
      if (handleScrollUpInstance) handleScrollUpInstance(currentScrollY, oldScrollY);
    }

    function handleScrollDown(currentScrollY: PxValue, oldScrollY: PxValue) {
      const handleScrollDownInstance = getRefCurrentPtr(handleScrollDownRef);
      if (handleScrollDownInstance) handleScrollDownInstance(currentScrollY, oldScrollY);
    }

    function handleScroll() {
      const currentScrollY = window.scrollY;
      const oldScrollY = lastScrollY.current;
      lastScrollY.current = currentScrollY;

      handleScrollUp(currentScrollY, oldScrollY);
      handleScrollDown(currentScrollY, oldScrollY);
    }

    const throttledMagnetizationHandler = throttle(handleMagnetization, APPROX_120_FPS_THROTTLE_TIMING_IN_MS);
    const throttledScrollHandler = throttle(handleScroll, APPROX_120_FPS_THROTTLE_TIMING_IN_MS);

    window.addEventListener('scroll', throttledMagnetizationHandler);
    window.addEventListener('scroll', throttledScrollHandler);

    return () => {
      window.removeEventListener('scroll', throttledMagnetizationHandler);
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, [isLargeScreen, handleMagnetization]);

  useEffect(
    () => {
      function initializeHeadingSlug(): MaybeNull<HeadingSlug> {
        const maybeHeadingSlugFromHash = getCurrentHeadingSlugFromHash(true);
        if (maybeHeadingSlugFromHash) {
          dropOldHeadingFocusAndSetCurrentHeading(maybeHeadingSlugFromHash);
          return maybeHeadingSlugFromHash;
        }

        const maybeInferedHeading: MaybeNull<HeadingSlug> = inferCurrentHeading()?.id ?? null;
        if (maybeInferedHeading) {
          dropOldHeadingFocusAndSetCurrentHeading(maybeInferedHeading);
          return maybeInferedHeading;
        }

        return null;
      }

      const maybeHeadingSlug = initializeHeadingSlug();
      if (maybeHeadingSlug) forcedHeadingSlugRef.current = maybeHeadingSlug;

      populateHandleScrollUpAndHandleScrollDown();
      handleMagnetization();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (!isLargeScreen) {
      setDocumentHeadingsOnClickEvent(false);
      return;
    }

    setDocumentHeadingsOnClickEvent();

    return () => setDocumentHeadingsOnClickEvent(false);
  }, [isLargeScreen, setDocumentHeadingsOnClickEvent]);

  return (
    <nav
      className="flex flex-col items-center self-start transition-[margin-top] duration-300"
      data-pagefind-ignore="all"
      aria-label={ariaLabel}
      ref={tocRef}
    >
      <ol className="mb-1 max-h-[354px] w-full list-none space-y-3 overflow-auto px-4" ref={headingsRef}>
        {headings.map((heading) => (
          <li
            className={cn('w-fit list-none text-sm font-bold text-white transition-all duration-200 ease-in-out', {
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'mt-2': heading.slug === currentHeading && slugAndIndexAssoc[heading.slug] === 0,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'font-medium': 3 <= heading.depth && heading.depth <= 6,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-6': heading.depth === 5 || heading.depth === 6,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-4': heading.depth === 4,
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              'ml-2': heading.depth === 3
            })}
            key={heading.slug}
          >
            {(!isCollapsed && (
              <Link
                className={cn('block transition-all', {
                  'rounded-md bg-primary p-1 font-bold': heading.slug === currentHeading,
                  'hover:underline focus:text-primary': heading.slug !== currentHeading,
                  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                  'p-1': slugAndIndexAssoc[heading.slug] === headings.length - 1
                })}
                onClick={(event) => {
                  onClickMagic(event, heading);
                }}
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
type HeadingSlugIdx = Index;
