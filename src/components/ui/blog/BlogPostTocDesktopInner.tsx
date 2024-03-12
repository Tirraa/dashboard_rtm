import type { MaybeNull } from '@rtm/shared-types/CustomUtilityTypes';
import type { FunctionComponent } from 'react';

import { useScrollDirection } from '@/components/hooks/useScrollDirection';
import { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import useIsLargeScreen from '@/components/hooks/useIsLargeScreen';
import { computeHTMLElementHeight } from '@rtm/shared-lib/html';
import { getRefCurrentPtr } from '@rtm/shared-lib/react';
import { useRouter } from 'next/navigation';
import { getNavbar } from '@/lib/html';
import { cn } from '@/lib/tailwind';
import Link from 'next/link';

import type { BlogPostTocDesktopProps } from './BlogPostTocDesktopLazy';

import BlogPostTocCollapseButton, { COLLAPSE_BUTTON_HEIGTH_IN_PX } from './BlogPostTocCollapseButton';

export interface BlogPostTocDesktopInnerProps extends BlogPostTocDesktopProps {
  ariaLabel: string;
}

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

function getClosestUpHeadingFromBottom(): MaybeNull<HTMLElement> {
  const headingsFromDOM = getAllDocumentHeadingsFromDOM();
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
  const [yMin, yMax] = [window.scrollY + TOP_DEAD_ZONE_PX, window.scrollY + window.innerHeight - BOTTOM_DEAD_ZONE_PX];

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

const BlogPostTocDesktopInner: FunctionComponent<BlogPostTocDesktopInnerProps> = ({ ariaLabel, headings }) => {
  const router = useRouter();
  const isLargeScreen = useIsLargeScreen();
  const scrollDirection = useScrollDirection();
  const [currentHeading, setCurrentHeading] = useState<HeadingSlug>('');
  const [isMagnetized, setIsMagnetized] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const headingsObserver = useRef<MaybeNull<IntersectionObserver>>(null);
  const visibleHeadings = useRef<VisibleHeadings>({});
  const headingsRef = useRef<HTMLOListElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);
  const currentHeadingRef = useRef<HeadingSlug>(currentHeading);
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

  const inferCurrentHeadingOnInitialize = useCallback(() => {
    const infered1 = getClosestUpHeadingFromTop();
    if (infered1) {
      setCurrentHeading(infered1.id);
      return;
    }

    const infered2 = getClosestUpHeadingFromBottom();
    if (!infered2) return;

    setCurrentHeading(infered2.id);
  }, []);

  const getFirstVisibleHeadingSlug = useCallback(() => {
    let firstSlug = '';
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
    if (scrollDirection !== 'down' || !isLargeScreen || muteUpdatesUntilScrollEnd.current) return;

    const atBottom = window.scrollY + window.innerHeight === document.documentElement.scrollHeight;
    if (atBottom) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      const veryLastHeadingSlug = headings[headings.length - 1].slug;
      forcedHeadingSlugRef.current = '';
      setCurrentHeading(veryLastHeadingSlug);
      return;
    }

    const firstVisibleHeadingSlug = getFirstVisibleHeadingSlug();

    if (forcedHeadingSlugRef.current) {
      const newIdx = slugAndIndexAssoc[firstVisibleHeadingSlug];
      const oldIdx = slugAndIndexAssoc[forcedHeadingSlugRef.current];
      if (newIdx >= oldIdx) forcedHeadingSlugRef.current = '';
      else return;
    }

    if (firstVisibleHeadingSlug) setCurrentHeading(firstVisibleHeadingSlug);
  }, [headings, getFirstVisibleHeadingSlug, isLargeScreen, scrollDirection, slugAndIndexAssoc]);

  const handleMagnetization = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const firstHeading = document.getElementById(headings[0].slug);
    if (!firstHeading) return;

    const TOP_DELTA_IN_PX = 1;
    const [yMin, yMax] = [window.scrollY + TOP_DEAD_ZONE_PX - TOP_DELTA_IN_PX, window.scrollY + window.innerHeight - BOTTOM_DEAD_ZONE_PX];
    const visibleFirstHeading = yMax >= firstHeading.offsetTop && firstHeading.offsetTop >= yMin;
    if (!visibleFirstHeading) setIsMagnetized(true);
    else setIsMagnetized(false);
  }, [headings]);

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
        threshold: 0.5
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

  useEffect(
    () => {
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isCollapsed]
  );

  useEffect(
    () => {
      inferCurrentHeadingOnInitialize();
      handleMagnetization();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (!isLargeScreen) return;

    const handleResize = () => {
      inferCurrentHeadingOnInitialize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isLargeScreen, inferCurrentHeadingOnInitialize]);

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
                onClick={(event) => {
                  event.preventDefault();
                  const elem = document.getElementById(heading.slug);
                  if (!elem) return;
                  forcedHeadingSlugRef.current = heading.slug;
                  muteUpdatesUntilScrollEnd.current = true;
                  router.replace('#' + heading.slug, { scroll: false });
                  setCurrentHeading(forcedHeadingSlugRef.current);
                  window.scrollTo({ top: elem.offsetTop - TOC_SCROLL_TOP_OFFSET_IN_PX, behavior: 'smooth' });
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

export default BlogPostTocDesktopInner;

type HeadingSlug = string;
type HeadingSlugIdx = number;
type VisibleHeadings = Record<HeadingSlug, HeadingSlugIdx>;
